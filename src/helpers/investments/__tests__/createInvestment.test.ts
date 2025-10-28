describe('createInvestments tests', () => {
	const investmentDto = { fund_id: 1, amount_usd: 500000, date: '2025-04-01' };
	const dbRow = { id: 7, fund_id: 1, amount_usd: 500000, date: '2025-04-01', created_at: new Date("2025-04-02") };
	const mappedDto = { id: dbRow.id, fund_id: dbRow.fund_id, amount_usd: dbRow.amount_usd, date: dbRow.date, created_at: dbRow.created_at };

	const investmentDtoToInvestment = jest.fn(() => ({ fund_id: investmentDto.fund_id, amount_usd: investmentDto.amount_usd, date: investmentDto.date }));
	const investmentToInvestmentDto = jest.fn(() => mappedDto);

	const knexMock = jest.fn().mockReturnValue({
		insert: jest.fn().mockReturnThis(),
		returning: jest.fn().mockResolvedValue([dbRow]),
	});

	jest.mock('../../mapper', () => ({ investmentDtoToInvestment, investmentToInvestmentDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { createInvestments } = require('../createInvestment');

	it('creates investment and returns mapped DTO when DB call succeeds', async () => {
		const result = await createInvestments(investmentDto);

		expect(result).toEqual(mappedDto);
		expect(investmentDtoToInvestment).toHaveBeenCalledWith(investmentDto);
		expect(knexMock).toHaveBeenCalledWith('investments');

		const builder = knexMock.mock.results[0].value;
		expect(builder.insert).toHaveBeenCalledWith(investmentDtoToInvestment());
		expect(builder.returning).toHaveBeenCalledWith('*');
		expect(investmentToInvestmentDto).toHaveBeenCalledWith(dbRow);
	});

	it('throws and logs when DB insert fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			insert: jest.fn().mockReturnThis(),
			returning: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(createInvestments(investmentDto)).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
