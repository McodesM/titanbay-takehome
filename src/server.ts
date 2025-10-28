import express from "express";
import cors from "cors"
import baseRouter from "./routes/baseRouter";
import { PORT } from "./config";


const app = express();


app.use(cors());
app.use(express.json());

app.use("/", baseRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

