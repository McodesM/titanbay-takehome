import {Request, Response} from "express";
import { InvestorDto } from "../../dtos/InvestorDto";
import { insertInvestor } from "../../helpers/investors/insertInvestor";

export const createInvestorHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, investor_type } = req.body as InvestorDto;
        if (!name || !email || !investor_type) {
            return res.status(400).json({ error: 'All investor details are required' });
        }
        const investorDto: InvestorDto = {
            name,
            email,
            investor_type
        };
        const investor:InvestorDto = await insertInvestor(investorDto);
        res.status(201).json({
            message: "Investor created successfully",
            data: investor
        });
    } catch (error) {
        console.error(`Error in createInvestorHandler: ${error}`);
        res.status(500).json({ error: `Error inserting Investor: ${error}` });
    }
};