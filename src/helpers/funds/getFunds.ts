import { FundDto } from "../../dtos/FundDto";
import { Fund } from "../../models/Fund";
import { knexClient as knex } from "../../persistence/knexConfig"
import { fundToFundDto } from "../mapper";

export const getFunds = async():Promise<FundDto[]> =>{
    try{
        const res:Fund[] = await knex('funds').select('*').from('funds');
        console.log('Retrieved Funds:', res);
        const funds:FundDto[] = res.map((fund)=>fundToFundDto(fund))
        return funds;
    }catch(error){
        console.error('Error in getFunds:', error);
        throw error;
    }
}