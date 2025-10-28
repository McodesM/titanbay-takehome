import { knexClient as knex } from "../../persistence/knexConfig";
export const getInvestorById = async(investorId:string) =>{
    try{
        const fund = await knex('investors').where({id: investorId}).select('*');
        console.log('Retrieved Investor by ID:', fund);
        return fund;
    }catch(error){
        console.error('Error in getInvestorById:', error);
        throw error;
    }}