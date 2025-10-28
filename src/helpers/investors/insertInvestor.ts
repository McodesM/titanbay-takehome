import { InvestorDto } from "../../dtos/InvestorDto";
import { Investor } from "../../models/Investor";
import { knexClient as knex } from "../../persistence/knexConfig";
import { investorDtoToInvestor, investorToInvestorDto } from "../mapper";
export const insertInvestor = async (investorDto: InvestorDto): Promise<InvestorDto> => {
    try {
        const investor: Partial<Investor> = investorDtoToInvestor(investorDto);
        const [res]: Investor[] = await knex('investors').insert(investor).returning('*');
        console.log('Inserted Investor:', res);
        const insertedInvestor: InvestorDto = investorToInvestorDto(res);
        return insertedInvestor;
    } catch (error) {
        console.error('Error in insertInvestor:', error);
        throw error;
    }
}