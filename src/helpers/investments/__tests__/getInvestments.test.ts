describe('getInvestments tests', () => {
	const mockRows = [
		{ id: 1, fund_id: 1, amount_usd: 100000, date: '2025-04-01', created_at: new Date("2025-04-02") },
		{ id: 2, fund_id: 1, amount_usd: 200000, date: '2025-04-05', created_at: new Date("2025-04-06") },
	];

	const knexMock = jest.fn().mockReturnValue({
		where: jest.fn().mockReturnThis(),
		select: jest.fn().mockResolvedValue(mockRows),
	});

	const investmentToInvestmentDto = jest.fn((i: any) => ({ id: i.id, fund_id: i.fund_id, amount_usd: i.amount_usd, date: i.date, created_at: i.created_at }));
	jest.mock('../../mapper', () => ({ investmentToInvestmentDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { getInvestments } = require('../getInvestments');

	it('returns mapped investments when DB returns rows', async () => {
		const result = await getInvestments('1');

		expect(result).toEqual(mockRows.map(investmentToInvestmentDto));
		expect(knexMock).toHaveBeenCalledWith('investments');

		const builder = knexMock.mock.results[0].value;
		expect(builder.where).toHaveBeenCalledWith('fund_id', '=', '1');
		expect(builder.select).toHaveBeenCalledWith('*');
	});

	it('throws and logs when DB query fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			where: jest.fn().mockReturnThis(),
			select: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(getInvestments('1')).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
