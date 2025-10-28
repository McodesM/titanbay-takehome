import {Request, Response} from "express";
import { getFunds } from "../../helpers/funds/getFunds";
export const getFundsHandler = async(req:Request, res:Response) => {
    try{
        const funds = await getFunds();
        res.status(200).json({
            message: "Funds retrieved successfully",
            data: funds
        });
    }catch(error){
        console.error('Error in getFundsHandler:', error);
        res.status(500).json({error: `Error retrieving funds: ${error}`} );
    }
}