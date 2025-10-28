describe('getFundById tests', () => {
	const mockRow = { id: 1, name: 'Fund A', vintage_year: 2024, target_size_usd: 300000000.00, status: "Investing", created_at: new Date("2025-01-01") };

	const knexMock = jest.fn().mockReturnValue({
		where: jest.fn().mockReturnThis(),
		select: jest.fn().mockResolvedValue([mockRow]),
	});

	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { getFundById } = require('../getFundById');

	it('returns fund when DB returns rows', async () => {
		const result = await getFundById('1');

		expect(result).toEqual([mockRow]);
		expect(knexMock).toHaveBeenCalledWith('funds');

		const builder = knexMock.mock.results[0].value;
		expect(builder.where).toHaveBeenCalledWith({ id: '1' });
		expect(builder.select).toHaveBeenCalledWith('*');
	});

	it('throws and logs when DB query fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			where: jest.fn().mockReturnThis(),
			select: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(getFundById('1')).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});


