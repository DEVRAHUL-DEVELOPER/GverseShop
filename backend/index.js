import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const port =process.env.PORT || 6000;

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true, 
}))

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});