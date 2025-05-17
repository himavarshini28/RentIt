import router from "express";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminModel } from "../db.js";

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
    const {email,password,firstName,lastName}=req.body;
    try{
        adminModel.create({
            email,
            password:await bcrypt.hash(password,5),
            firstName,
            lastName
        })
        res.status(200).json(
            {
                "message":"Admin created successfully",
            }
        )
    }
    catch(error)
    {
        console.log("Error in creating admin",error);
        res.status(500).json({
            message:"Error in creating admin",
            error:error.message
        })
    }
})

adminRouter.post("/signin", async (req, res) => {})

adminRouter.post("/addProperty", async (req, res) => {})

adminRouter.post("/getProperties", async (req, res) => {})

adminRouter.post("/getProperty", async (req, res) => {})

adminRouter.post("/deleteProperty", async (req, res) => {})

adminRouter.post("/updateProperty", async (req, res) => {})

adminRouter.post("/getAdmin", async (req, res) => {})

adminRouter.post("/updateAdmin", async (req, res) => {})

export default adminRouter;