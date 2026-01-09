import express from 'express';
import cors from 'cors';
import userRouter from './Routes/route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: [
    "http://localhost",
    "http://localhost:80",
  ],
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',userRouter);
app.get('/',(req,res)=>{
    res.send('Hello from Express server');
})
export default app;   