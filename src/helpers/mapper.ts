import e from "express";
import { FundDto } from "../dtos/FundDto";
import { InvestmentDto } from "../dtos/InvestmentDto";
import { InvestorDto } from "../dtos/InvestorDto";
import { Fund } from "../models/Fund";
import { Investment } from "../models/Investment";
import { Investor } from "../models/Investor";

export const fundDtoToFund = (dto: FundDto): Partial<Fund> => {
    return {
        name: dto.name,
        vintage_year: dto.vintage_year,
        target_size_usd: dto.target_size_usd?.toFixed(2),
        status: dto.status
    };
}

export const fundToFundDto = (fund: Fund): FundDto => {
    return {
        id: fund.id,
        name: fund.name,
        vintage_year: fund.vintage_year,
        target_size_usd: parseFloat(Number(fund.target_size_usd).toFixed(2)),
        status: fund.status,
        created_at: fund.created_at
    };
}

export const investorDtoToInvestor = (dto: InvestorDto): Partial<Investor> => {
    return {
        name: dto.name!,
        investor_type: dto.investor_type!,
        email: dto.email!,
    }
}

export const investorToInvestorDto = (investor: Investor): InvestorDto => {
    return {
        id: investor.id,
        name: investor.name,
        investor_type: investor.investor_type,
        email: investor.email,
        created_at: investor.created_at
    }
}

export const investmentDtoToInvestment = (dto: InvestmentDto): Partial<Investment> => {
    return {
        investor_id: dto.investor_id,
        fund_id: dto.fund_id,
        amount_usd: dto.amount_usd?.toFixed(2),
        investment_date: dto.investment_date
    }
}

export const investmentToInvestmentDto = (investment: Investment): InvestmentDto => {
    return {
        id: investment.id,
        investor_id: investment.investor_id,
        fund_id: investment.fund_id,
        amount_usd: Number(investment.amount_usd),
        investment_date: investment.investment_date
    }
}   