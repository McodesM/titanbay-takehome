import {Request, Response} from "express";
import { InvestmentDto } from "../../dtos/InvestmentDto";
import { createInvestments } from "../../helpers/investments/createInvestment";
import { getFundById } from "../../helpers/funds/getFundById";
import { getInvestorById } from "../../helpers/investors/getInvestorById";

export const createInvestmentHandler = async (req: Request, res: Response) => {
    try {
        const fundId = req.params.fund_id;
        const {investor_id, amount_usd, investment_date} = req.body as Partial<InvestmentDto>;

        if (!fundId || !investor_id || !amount_usd || !investment_date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const checkFund = await getFundById(fundId);
        if (checkFund.length == 0) {
            return res.status(404).json({ error: 'Fund not found' });
        }
        const checkInvestor = await getInvestorById(investor_id);
        if (checkInvestor.length == 0) {
            return res.status(404).json({ error: 'Investor not found' });
        }

        const newInvestment: Partial<InvestmentDto> = {
            fund_id: fundId,
            investor_id,
            amount_usd,
            investment_date
        }
        const investment = await createInvestments(newInvestment);
        return res.status(201).json({
            message: 'Investment created successfully',
            data: investment
        });
    } catch (error) {
        console.error('Error in createInvestmentHandler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}