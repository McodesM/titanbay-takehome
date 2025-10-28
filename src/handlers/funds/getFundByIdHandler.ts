import { Request, Response } from 'express';
import { getFundById } from '../../helpers/funds/getFundById';

export const getFundByIdHandler = async (req: Request, res: Response) => {
    try {
        const fundId = req.params.id;

        if (!fundId) {
            return res.status(400).json({ error: 'Fund ID is required' });
        }

        const fund = await getFundById(fundId);

        return res.status(200).json({
            message: 'Fund retrieved successfully',
            data: fund
        });

    } catch (error) {
        console.error('Error in getFundByIdHandler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};