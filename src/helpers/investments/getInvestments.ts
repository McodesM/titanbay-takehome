import { knexClient as knex } from "../../persistence/knexConfig";
import { investmentToInvestmentDto } from "../mapper";

export const getInvestments = async (fundId: string) => {
    try {
        const res = await knex('investments').where('fund_id','=',fundId).select('*'); 
        console.log('Retrieved Investments:', res);
        const investments = res.map((investment) => investmentToInvestmentDto(investment));
        return investments;
    } catch (error) {
        console.error('Error in getInvestments:', error);
        throw error;
    }
}