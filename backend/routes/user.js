import {userModel} from "../db.js";
import express from "express";
import { userVerification } from "../zod/userVerification.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  userMiddleware  from "../middlewares/user.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const verifiedUser = await userVerification.safeParse(req.body);
    if (verifiedUser.success) {
        const { email, password, firstName, lastName } = req.body;
        try {
            // Check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "User with this email already exists."
                });
            }
            await userModel.create({
                email,
                password: await bcrypt.hash(password, 5),
                firstName,
                lastName
            });
            res.status(200).json({
                message: "User created successfully",
            });
        } catch (error) {
            console.log("Error in creating user", error);
            res.status(500).json({
                message: "Error in creating user",
                error: error.message
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid data",
        });
    }
});
userRouter.post("/signin", async (req, res) => {
    const {email,password}=req.body;
    try{
        const user= await userModel.findOne(
            {
                email
            }
        )
        if(!user)
        {
            return res.status(404).json(
                {
                    message:"User not found"
                }
            )
        }
        const verifiedPassword= await bcrypt.compare(password,user.password);
        if(!verifiedPassword)
        {
            res.status(401).json({
                message:"Invalid password"
            })
        }
        const token = jwt.sign({id:user._id},process.env.JWT_USER_SECRET);
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
userRouter.post("/getUser", userMiddleware,async (req, res) => {res.send(req.userId)});
userRouter.post("/updateUser", async (req, res) => {});
userRouter.post("/deleteUser", async (req, res) => {});
userRouter.post("/getMyList", async (req, res) => {});
userRouter.post("/myPurchases", async (req, res) => {});
userRouter.post("/purchase", async (req, res) => {});
userRouter.post("/addToMyList", async (req, res) => {});
userRouter.post("/removeFromMyList", async (req, res) => {});


export default userRouter;



