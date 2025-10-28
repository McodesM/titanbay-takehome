import { fundDtoToFund, fundToFundDto, investorDtoToInvestor, investorToInvestorDto, investmentDtoToInvestment, investmentToInvestmentDto } from "../mapper";

describe("mapper helpers", () => {
    describe("fundDtoToFund tests", () => {
        it("maps FundDto -> Partial<Fund> keeping expected fields", () => {
            const dto: any = {
                name: "Alpha Fund",
                vintage_year: 2020,
                target_size_usd: 5000000.00,
                status: "open",
                extra: "ignored"
            };

            const result = fundDtoToFund(dto);
            expect(result).toEqual({
                name: "Alpha Fund",
                vintage_year: 2020,
                target_size_usd: "5000000.00",
                status: "open"
            });
        });
    });

    describe("fundToFundDto tests", () => {
        it("maps Fund -> FundDto with same core fields", () => {
            const fund: any = {
                id: 1,
                name: "Beta Fund",
                vintage_year: 2018,
                target_size_usd: 750000,
                status: "closed",
                created_at: new Date("2020-01-01")
            };

            const dto = fundToFundDto(fund);
            expect(dto).toEqual({
                id: 1,
                name: "Beta Fund",
                vintage_year: 2018,
                target_size_usd: 750000,
                status: "closed",
                created_at: new Date("2020-01-01")
            });
        });
    });

    describe("investorDtoToInvestor tests", () => {
        it("maps InvestorDto -> Partial<Investor> and includes required fields", () => {
            const dto: any = {
                name: "Jane Doe",
                investor_type: "individual",
                email: "jane@example.com",
                phone: "555-0000"
            };

            const result = investorDtoToInvestor(dto);
            expect(result).toEqual({
                name: "Jane Doe",
                investor_type: "individual",
                email: "jane@example.com"
            });
            // extra fields should not be present
            expect((result as any).phone).toBeUndefined();
        });

        it("returns undefined properties when DTO fields are missing (runtime behavior)", () => {
            const dto: any = {};
            const result = investorDtoToInvestor(dto);
            expect(result).toEqual({
                name: undefined,
                investor_type: undefined,
                email: undefined
            });
        });
    });
        

    describe("investorDtoToInvestor tests", () => {
        it("maps InvestorDto -> Partial<Investor> and includes required fields", () => {
            const dto: any = {
                name: "Jane Doe",
                investor_type: "individual",
                email: "jane@example.com",
                phone: "555-0000"
            };

            const result = investorDtoToInvestor(dto);
            expect(result).toEqual({
                name: "Jane Doe",
                investor_type: "individual",
                email: "jane@example.com"
            });
            // extra fields should not be present
            expect((result as any).phone).toBeUndefined();
        });

        it("returns undefined properties when DTO fields are missing (runtime behavior)", () => {
            const dto: any = {};
            const result = investorDtoToInvestor(dto);
            expect(result).toEqual({
                name: undefined,
                investor_type: undefined,
                email: undefined
            });
        });
    });

    describe("investorToInvestorDto", () => {
        it("maps Investor -> InvestorDto preserving core fields and not leaking extras", () => {
            const investor: any = {
                id: 42,
                name: "Alice Investor",
                investor_type: "institutional",
                email: "alice@invest.com",
                created_at: new Date("2021-06-15T00:00:00.000Z"),
                internal_flag: true // should not appear on DTO
            };

            const dto = investorToInvestorDto(investor);
            expect(dto).toEqual({
                id: 42,
                name: "Alice Investor",
                investor_type: "institutional",
                email: "alice@invest.com",
                created_at: new Date("2021-06-15T00:00:00.000Z")
            });
            expect((dto as any).internal_flag).toBeUndefined();
        });
    });

    describe("investmentToInvestmentDto", () => {
        it("maps Investment -> InvestmentDto preserving core fields and not leaking extras", () => {
            const investment: any = {
                id: 900,
                investor_id: 123,
                fund_id: 456,
                amount_usd: 10000,
                investment_date: "2024-12-31",
                notes: "internal only"
            };

            const dto = investmentToInvestmentDto(investment);
            expect(dto).toEqual({
                id: 900,
                investor_id: 123,
                fund_id: 456,
                amount_usd: 10000,
                investment_date: "2024-12-31"
            });
            expect((dto as any).notes).toBeUndefined();
        });
    });

    describe("investmentDtoToInvestment", () => {
        it("maps InvestmentDto -> Partial<Investment> preserving values including falsy ones", () => {
            const dto: any = {
                investor_id: 123,
                fund_id: 456,
                amount_usd: 0, // falsy but valid
                investment_date: "2025-01-01"
            };

            const result = investmentDtoToInvestment(dto);
            expect(result).toEqual({
                investor_id: 123,
                fund_id: 456,
                amount_usd: "0.00",
                investment_date: "2025-01-01"
            });
        });
    });
});
