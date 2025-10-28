describe('getInvestors tests', () => {
	const mockRows = [
		{ id: 1, name: 'Investor A', email: 'a@example.com', created_at: new Date("2025-05-01") },
		{ id: 2, name: 'Investor B', email: 'b@example.com', created_at: new Date("2025-05-02") },
	];

	const knexMock = jest.fn().mockReturnValue({
		select: jest.fn().mockResolvedValue(mockRows),
	});

	const investorToInvestorDto = jest.fn((i: any) => ({ id: i.id, name: i.name, email: i.email, created_at: i.created_at }));
	jest.mock('../../mapper', () => ({ investorToInvestorDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { getInvestors } = require('../getInvestors');

	it('returns mapped investors when DB returns rows', async () => {
		const result = await getInvestors();

		expect(result).toEqual(mockRows.map(investorToInvestorDto));
		expect(knexMock).toHaveBeenCalledWith('investors');

		const builder = knexMock.mock.results[0].value;
		expect(builder.select).toHaveBeenCalledWith('*');
	});

	it('throws and logs when DB query fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			select: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(getInvestors()).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
