import {Request, Response} from "express";
import { FundDto } from "../../dtos/FundDto";
import { insertFund } from "../../helpers/funds/insertFund";

export const createFundHandler = async(req:Request, res:Response) => {
    try{
        const {name, vintage_year, target_size_usd, status} = req.body as FundDto;
        // Logic to create fund
        if(!name || !vintage_year || !target_size_usd || !status){
            return res.status(400).json({error: 'All fund details are required'});
        }
        const fundDto:FundDto = {
            name,
            vintage_year,
            target_size_usd,
            status
        };
        const insertedFund = await insertFund(fundDto);
        res.status(201).json({
            message: "Fund created successfully",
            data: insertedFund
        });
    }catch(error){
        console.error(`Error in createFundHandler: ${error}`);
        res.status(500).json({error: `Error insertingFund: ${error}`} );
}
}

