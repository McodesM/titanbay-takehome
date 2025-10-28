import { InvestmentDto } from "../../dtos/InvestmentDto";
import { Investment } from "../../models/Investment";
import { knexClient as knex} from "../../persistence/knexConfig";
import { investmentDtoToInvestment, investmentToInvestmentDto } from "../mapper";

export const createInvestments = async (investmentDto:InvestmentDto) => {
    try {
        const investment = investmentDtoToInvestment(investmentDto)
        const [res]:Investment[] = await knex('investments').insert(investment).returning('*');
        console.log('Created Investment:', res);
        const createdInvestment = investmentToInvestmentDto(res)// Assuming the returned res is the same as input DTO
        return createdInvestment;
    } catch (error) {
        console.error('Error in createInvestments:', error);
        throw error;
    }
}