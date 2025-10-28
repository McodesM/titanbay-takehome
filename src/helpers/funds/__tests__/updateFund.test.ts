describe('updateFund tests', () => {
	const inputDto = { id: 5, name: 'Updated Fund', status: 'Closed' };
	const dbRow = { id: 5, name: 'Updated Fund', vintage_year: 2024, target_size_usd: 5000000, status: 'Closed', created_at: new Date("2025-03-03") };
	const mappedDto = { id: dbRow.id, name: dbRow.name, vintage_year: dbRow.vintage_year, target_size_usd: dbRow.target_size_usd, status: dbRow.status, created_at: dbRow.created_at };

	const fundToFundDto = jest.fn(() => mappedDto);

	const knexMock = jest.fn().mockReturnValue({
		where: jest.fn().mockReturnThis(),
		update: jest.fn().mockReturnThis(),
		returning: jest.fn().mockResolvedValue([dbRow]),
	});

	jest.mock('../../mapper', () => ({ fundToFundDto }));
	jest.mock('../../../persistence/knexConfig', () => ({ knexClient: knexMock }));

	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	const { updateFund } = require('../updateFund');

	it('updates fund and returns mapped DTO when DB call succeeds', async () => {
		const result = await updateFund(inputDto);

		expect(result).toEqual(mappedDto);
		expect(knexMock).toHaveBeenCalledWith('funds');

		const builder = knexMock.mock.results[0].value;
		expect(builder.where).toHaveBeenCalledWith({ id: inputDto.id });
		expect(builder.update).toHaveBeenCalledWith({ name: inputDto.name, status: inputDto.status });
		expect(builder.returning).toHaveBeenCalledWith('*');
		expect(fundToFundDto).toHaveBeenCalledWith(dbRow);
	});

	it('throws and logs when DB update fails', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});

		(knexMock as jest.Mock).mockReturnValueOnce({
			where: jest.fn().mockReturnThis(),
			update: jest.fn().mockReturnThis(),
			returning: jest.fn().mockRejectedValue(new Error('DB error')),
		});

		await expect(updateFund(inputDto)).rejects.toThrow('DB error');
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});
});
