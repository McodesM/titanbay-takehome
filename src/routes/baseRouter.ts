import { Router } from "express";
import fundsRouter from "./funds/fundsRouter";
import investmentsRouter from "./investments/investmentsRouter";
import investorsRouter from "./investors/investorsRouter";

const baseRouter = Router()
baseRouter.get("/", (req, res) => {
    res.send("Welcome to Titanbay API")
})
baseRouter.use("/", fundsRouter)
baseRouter.use("/", investorsRouter)
baseRouter.use("/", investmentsRouter)
export default baseRouter