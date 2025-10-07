import express from 'express'
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import vaultItemRouter from './routes/vaultItemRoute.js';
import connectDB from './config/db.js';
import 'dotenv/config';



// app config
const app=express();
const port= process.env.PORT || 5000;
connectDB();


// Middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/v1/user', userRouter);
app.use('/api/v1/vault', vaultItemRouter);


// demo
app.get('/',(req,res)=>{
    res.send('hello world')
})

// start server
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})