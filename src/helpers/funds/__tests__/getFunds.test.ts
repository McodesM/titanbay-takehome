describe('getFunds tests', () => {
	const mockRows = [
		{ id: 1, name: 'Fund A', vintage_year: 2024, target_size_usd: 300000000.00, status: "Investing", created_at: new Date("2025-01-01") },
		{ id: 2, name: 'Fund B', vintage_year: 2024, target_size_usd: 20000000.00, status: "Investing", created_at: new Date("2025-01-01") },
	];

    const knexMock = jest.fn().mockReturnValue({
			select: jest.fn().mockReturnThis(),
			from: jest.fn().mockResolvedValue(mockRows),
		});
    
    const fundToFundDto = jest.fn((f: any) => ({ id: f.id, name: f.name, vintage_year: f.vintage_year, target_size_usd: f.target_size_usd, status: f.status, created_at: f.created_at }));
    jest.mock('../../mapper', () => ({ fundToFundDto }));
    jest.mock('../../../persistence/knexConfig',() => ({ knexClient: knexMock }));
	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

    const { getFunds } = require('../getFunds');
	it('returns mapped funds when DB returns rows', async () => {
		

		const result = await getFunds();

		expect(result).toEqual(mockRows.map(fundToFundDto));
		expect(knexMock).toHaveBeenCalledWith('funds');

		const builder = knexMock.mock.results[0].value;
		expect(builder.select).toHaveBeenCalledWith('*');
		expect(builder.from).toHaveBeenCalledWith('funds');

	});

	it('throws and logs when DB query fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            from: jest.fn().mockRejectedValue(new Error('DB error')),
        });

		await expect(getFunds()).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});