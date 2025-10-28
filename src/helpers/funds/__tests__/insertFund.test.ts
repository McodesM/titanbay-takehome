describe('insertFund tests', () => {
	const fundDto = { name: 'Fund X', vintage_year: 2026, target_size_usd: 1000000.00, status: 'Closed' };
	const dbRow = { id: 10, ...fundDto, created_at: new Date("2025-02-02") };
	const mappedDto = { id: dbRow.id, name: dbRow.name, vintage_year: dbRow.vintage_year, target_size_usd: dbRow.target_size_usd, status: dbRow.status, created_at: dbRow.created_at };

	const fundDtoToFund = jest.fn(() => ({ name: fundDto.name, vintage_year: fundDto.vintage_year, target_size_usd: fundDto.target_size_usd, status: fundDto.status }));
	const fundToFundDto = jest.fn(() => mappedDto);

	const knexMock = jest.fn().mockReturnValue({
		insert: jest.fn().mockReturnThis(),
		returning: jest.fn().mockResolvedValue([dbRow]),
	});

	jest.mock('../../mapper', () => ({ fundDtoToFund, fundToFundDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { insertFund } = require('../insertFund');

	it('inserts fund and returns mapped DTO when DB call succeeds', async () => {
		const result = await insertFund(fundDto);

		expect(result).toEqual(mappedDto);
		expect(fundDtoToFund).toHaveBeenCalledWith(fundDto);
		expect(knexMock).toHaveBeenCalledWith('funds');

		const builder = knexMock.mock.results[0].value;
		expect(builder.insert).toHaveBeenCalledWith(fundDtoToFund());
		expect(builder.returning).toHaveBeenCalledWith('*');
		expect(fundToFundDto).toHaveBeenCalledWith(dbRow);
	});

	it('throws and logs when DB insert fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			insert: jest.fn().mockReturnThis(),
			returning: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(insertFund(fundDto)).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
