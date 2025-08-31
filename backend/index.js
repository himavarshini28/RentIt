import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';
import propertyRouter from './routes/property.js';

dotenv.config();
const app=express();

// Configure CORS with specific options for debugging
app.use(cors({
  origin: '*', // Allow all origins for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add CORS debugging middleware
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());


// Add a default route for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.use('/api/admin/v1',adminRouter);
app.use('/api/user/v1',userRouter);
app.use('/api/property/v1',propertyRouter);


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
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


