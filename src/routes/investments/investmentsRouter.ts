import { Router } from "express";
import { getInvestmentHandler } from "../../handlers/investments/getInvestmentHandler";
import { createInvestmentHandler } from "../../handlers/investments/createInvestmentHandler";

const investmentsRouter = Router()

investmentsRouter.get('/funds/:fund_id/investments', getInvestmentHandler)
investmentsRouter.post('/funds/:fund_id/investments',createInvestmentHandler)
export default investmentsRouter