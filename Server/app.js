import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Database/Db.js';
import AdminRouter from "./Routes/Admin.routes.js"
import TraficRouter from './Routes/TraficData.routes.js';
const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });
app.use(cors({credentials: true}));

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api",AdminRouter)
app.use(TraficRouter)