import { FundDto } from "../../dtos/FundDto";
import { Fund } from "../../models/Fund";
import { knexClient as knex } from "../../persistence/knexConfig";
import { fundDtoToFund, fundToFundDto } from "../mapper";

export const insertFund = async (fundData: FundDto) => {
    try{
        const fund:Partial<Fund> = fundDtoToFund(fundData);
        const [res] = await knex('funds').insert(fund).returning('*');
        console.log('Inserted Fund:', res);
        const insertedFund = fundToFundDto(res);
        return insertedFund;
    }catch(error){
        console.error('Error in insertFund:', error);
        throw error;
    }
}