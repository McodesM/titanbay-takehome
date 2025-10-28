import { knexClient as knex } from "../../persistence/knexConfig";
export const getFundById = async(fundId:string) =>{
    try{
        const fund = await knex('funds').where({id: fundId}).select('*');
        console.log('Retrieved Fund by ID:', fund);
        return fund;
    }catch(error){
        console.error('Error in getFundById:', error);
        throw error;
    }}