import router from "express";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminModel } from "../db.js";
import { adminVerification } from "../zod/adminVerification.js";
import  adminMiddleware  from "../middlewares/admin.js";

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
    const verifiedAdmin = await adminVerification.safeParse(req.body);
    if (verifiedAdmin.success) {
        const { email, password, firstName, lastName } = req.body;
        try {
            // Check if admin already exists
            const existingAdmin = await adminModel.findOne({ email });
            if (existingAdmin) {
                return res.status(409).json({
                    message: "Admin with this email already exists."
                });
            }
            await adminModel.create({
                email,
                password: await bcrypt.hash(password, 5),
                firstName,
                lastName
            });
            res.status(200).json({
                message: "Admin created successfully",
            });
        } catch (error) {
            console.log("Error in creating admin", error);
            res.status(500).json({
                message: "Error in creating admin",
                error: error.message
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid data",
        });
    }
});

adminRouter.post("/signin", async (req, res) => {
    const {email,password}=req.body;
    try{
        const admin= await adminModel.findOne(
            {
                email
            }
        )
        if(!admin)
        {
            return res.status(404).json(
                {
                    message:"Admin not found"
                }
            )
        }
        const verifiedPassword= await bcrypt.compare(password,admin.password);
        if(!verifiedPassword)
        {
            res.status(401).json({
                message:"Invalid password"
            })
        }
        const token = jwt.sign({id:admin._id},process.env.JWT_ADMIN_SECRET);
        res.status(200).json({
            token,
        })
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:"error in signing in",
                error:error.message,
            }
        )
    }
})

adminRouter.post("/addProperty",adminMiddleware, async (req, res) => {res.send(req.adminId)})

adminRouter.post("/getProperties", async (req, res) => {})

adminRouter.post("/getProperty", async (req, res) => {})

adminRouter.post("/deleteProperty", async (req, res) => {})

adminRouter.post("/updateProperty", async (req, res) => {})

adminRouter.post("/getAdmin", async (req, res) => {})

adminRouter.post("/updateAdmin", async (req, res) => {})

export default adminRouter;