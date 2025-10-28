import { FundDto } from "../../dtos/FundDto";
import { Fund } from "../../models/Fund";
import { knexClient as knex } from "../../persistence/knexConfig";
import { fundToFundDto } from "../mapper";
export const updateFund = async (fundDto: Partial<FundDto>):Promise<FundDto> => {
    try {
        const fund: Partial<Fund> = {};
        if (fundDto.name !== undefined) fund.name = fundDto.name;
        if (fundDto.vintage_year !== undefined) fund.vintage_year = fundDto.vintage_year;
        if (fundDto.target_size_usd !== undefined) fund.target_size_usd = fundDto.target_size_usd.toString();
        if (fundDto.status !== undefined) fund.status = fundDto.status;

        const [returnedFund]:Fund[] = await knex('funds').where({ id: fundDto.id }).update(fund).returning('*');
        console.log('Updated Fund:', returnedFund);
        const updatedFund = fundToFundDto(returnedFund);
        return updatedFund;
    } catch (error) {
        console.error('Error in updateFund:', error);
        throw error;
    }
}