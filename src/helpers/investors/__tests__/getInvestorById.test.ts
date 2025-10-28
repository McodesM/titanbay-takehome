describe('getInvestorById tests', () => {
	const mockRow = { id: 1, name: 'Investor A', email: 'a@example.com', created_at: new Date("2025-05-01") };

	const knexMock = jest.fn().mockReturnValue({
		where: jest.fn().mockReturnThis(),
		select: jest.fn().mockResolvedValue([mockRow]),
	});

	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { getInvestorById } = require('../getInvestorById');

	it('returns investor when DB returns rows', async () => {
		const result = await getInvestorById('1');

		expect(result).toEqual([mockRow]);
		expect(knexMock).toHaveBeenCalledWith('investors');

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

		await expect(getInvestorById('1')).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
