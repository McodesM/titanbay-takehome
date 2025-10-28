describe('insertInvestor tests', () => {
	const investorDto = { name: 'Investor X', email: 'x@example.com' };
	const dbRow = { id: 11, ...investorDto, created_at: new Date("2025-06-01") };
	const mappedDto = { id: dbRow.id, name: dbRow.name, email: dbRow.email, created_at: dbRow.created_at };

	const investorDtoToInvestor = jest.fn(() => ({ name: investorDto.name, email: investorDto.email }));
	const investorToInvestorDto = jest.fn(() => mappedDto);

	const knexMock = jest.fn().mockReturnValue({
		insert: jest.fn().mockReturnThis(),
		returning: jest.fn().mockResolvedValue([dbRow]),
	});

	jest.mock('../../mapper', () => ({ investorDtoToInvestor, investorToInvestorDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { insertInvestor } = require('../insertInvestor');

	it('inserts investor and returns mapped DTO when DB call succeeds', async () => {
		const result = await insertInvestor(investorDto);

		expect(result).toEqual(mappedDto);
		expect(investorDtoToInvestor).toHaveBeenCalledWith(investorDto);
		expect(knexMock).toHaveBeenCalledWith('investors');

		const builder = knexMock.mock.results[0].value;
		expect(builder.insert).toHaveBeenCalledWith(investorDtoToInvestor());
		expect(builder.returning).toHaveBeenCalledWith('*');
		expect(investorToInvestorDto).toHaveBeenCalledWith(dbRow);
	});

	it('throws and logs when DB insert fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			insert: jest.fn().mockReturnThis(),
			returning: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(insertInvestor(investorDto)).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
