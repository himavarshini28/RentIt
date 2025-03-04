import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "../config/db";
import dotenv from "dotenv";
import propertyRoutes from "../routes/propertyRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("RentIt API is running");
});

app.use("/api/properties",propertyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
