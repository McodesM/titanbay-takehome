import { InvestorDto } from "../../dtos/InvestorDto";
import { Investor } from "../../models/Investor";
import { knexClient as knex } from "../../persistence/knexConfig";
import { investorToInvestorDto } from "../mapper";

export const getInvestors = async (): Promise<InvestorDto[]> => {
    try{
        const res:Investor[] = await knex('investors').select('*');
        console.log('Retrieved Investors:', res);
        const investors:InvestorDto[] = res.map((investor)=>investorToInvestorDto(investor));
        return investors;
    }catch(error){
        console.error('Error in getInvestors:', error);
        throw error;
    }
}