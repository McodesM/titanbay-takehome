import { Router } from "express"
import { getFundsHandler } from "../../handlers/funds/getFundsHandler"
import { createFundHandler } from "../../handlers/funds/createFundHandler"
import { updateFundHandler } from "../../handlers/funds/updateFundHandler"
import { getFundByIdHandler } from "../../handlers/funds/getFundByIdHandler"

const fundsRouter = Router()

fundsRouter.get('/funds', getFundsHandler)
fundsRouter.post('/funds', createFundHandler)
fundsRouter.put('/funds', updateFundHandler)
fundsRouter.get('/funds/:id', getFundByIdHandler)

export default fundsRouter