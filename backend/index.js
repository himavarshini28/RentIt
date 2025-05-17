import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';
import propertyRouter from './routes/property.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/admin/v1',adminRouter);
app.use('/api/user/v1',userRouter);
app.use('/api/property/v1',propertyRouter);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


const main=async()=>{
    try {
          await mongoose.connect(process.env.NEXT_MONGODB_URI).then(()=>{
        console.log("MongoDB connected");
    } )}
    catch (error) {
        console.log("MongoDB connection error",error);
    }
    

}
main();


