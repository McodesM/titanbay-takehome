import {Request, Response} from "express";
import { getInvestments } from "../../helpers/investments/getInvestments";

export const getInvestmentHandler = async (req:Request, res:Response) => {
    try {
        const fundId = req.params.fund_id;
        const investments = await getInvestments(fundId);
        return res.status(200).json({
            message: 'Investments retrieved successfully',
            data: investments
        });
    } catch (error) {
        console.error('Error in getInvestmentHandler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};