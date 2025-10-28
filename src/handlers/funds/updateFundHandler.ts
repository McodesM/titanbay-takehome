import { Request, Response } from 'express';
import { FundDto } from "../../dtos/FundDto";
import { updateFund } from '../../helpers/funds/updateFund';

export const updateFundHandler = async (req: Request, res: Response) => {
    try {
        const {id, name, vintage_year, target_size_usd, status } = req.body as FundDto;
        if (!id ) {
            return res.status(400).json({ error: 'fundId' });
        }

        const fundDto: Partial<FundDto> = {
            id,
            ...(name !== undefined ? { name } : {}),
            ...(vintage_year !== undefined ? { vintage_year } : {}),
            ...(target_size_usd !== undefined ? { target_size_usd } : {}),
            ...(status !== undefined ? { status } : {})
        };
        const fund:FundDto = await updateFund(fundDto);
        res.status(200).json({
            message: 'Fund updated successfully',
            data: fund
        });
    } catch (error) {
        console.error('Error in updateFundHandler:', error);
        res.status(500).json({ error: `Error updating fund: ${error}` });
    }
}