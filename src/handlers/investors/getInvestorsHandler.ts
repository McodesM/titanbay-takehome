import {Request, Response} from "express";
import { getInvestors } from "../../helpers/investors/getInvestors";
export const getInvestorsHandler = async (req:Request, res:Response) => {
    try {
        const investors = await getInvestors();
        return res.status(200).json({
            message: 'Investors retrieved successfully',
            data: investors
        });
    } catch (error) {
        console.error('Error in getInvestorHandler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }};