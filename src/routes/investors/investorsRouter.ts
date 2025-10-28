import { Router } from "express";
import { getInvestorsHandler } from "../../handlers/investors/getInvestorsHandler";
import { createInvestorHandler } from "../../handlers/investors/createInvestorHandler";


const investorsRouter = Router()

investorsRouter.get('/investors', getInvestorsHandler)
investorsRouter.post('/investors', createInvestorHandler)

export default investorsRouter