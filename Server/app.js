import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Database/Db.js';
import AdminRouter from "./Routes/Admin.routes.js"
import TraficRouter from './Routes/TraficData.routes.js';
import productRouter from './Routes/Products.routes.js';
import errorHandler from "./Middleware/Auth.middleware.js"
const app = express();
app.use(express.json());
dotenv.config({ path: "./.env" });
app.use(cors());

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
app.get("/health", (req, res) => {
    res.send("Hello World");
})
app.use("/api",AdminRouter)
app.use(TraficRouter)
app.use(productRouter)
app.use(errorHandler)