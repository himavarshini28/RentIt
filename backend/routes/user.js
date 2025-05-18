import {userModel} from "../db.js";
import express from "express";
import { userVerification } from "../zod/userVerification.js";
import bcrypt from "bcrypt";

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
userRouter.post("/signin", async (req, res) => {});
userRouter.post("/getUser", async (req, res) => {});
userRouter.post("/updateUser", async (req, res) => {});
userRouter.post("/deleteUser", async (req, res) => {});
userRouter.post("/getMyList", async (req, res) => {});
userRouter.post("/myPurchases", async (req, res) => {});
userRouter.post("/purchase", async (req, res) => {});
userRouter.post("/addToMyList", async (req, res) => {});
userRouter.post("/removeFromMyList", async (req, res) => {});


export default userRouter;



