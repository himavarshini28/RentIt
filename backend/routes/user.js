import {adminModel, userModel,purchaseModel,propertyModel} from "../db.js";
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
userRouter.post("/get-user",async (req, res) => {
    const {userId}=req.body;
    try{
        const user= await userModel.findOne(
            {
                _id:userId
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
        res.status(200).json({
            message:"User found",
            user
        })
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:"error in fetching user",
                error:error.message,
            }
        )
    }
});
userRouter.post("/get-admin",async(req,res)=>{
    const {adminId}=req.body;
    try{
        const admin= await adminModel.findOne(
            {
                _id:adminId
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
        res.status(200).json({
            message:"Admin found",
            admin
        })
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:"error in fetching admin",
                error:error.message,
            }
        )
    }   
})
userRouter.post("/profile",userMiddleware,async(req,res)=>{
    try{
        const user= await userModel.findOne({_id:req.userId});
        if(!user)
        {
            res.status(404).json({
                message:"user not found",
            })
        }
        res.status(200).json(
            {
                message:"user profile fetched",
                user
            }
        )
    }
    catch(error)
    {
        res.status(500).json({
            message:"error in fetching user",
            error:error.message,
        })
    }
})
userRouter.post("/update-user",userMiddleware, async (req, res) => {
    const {firstName,lastName}=req.body;
    try{
        const user= await userModel.findOne({_id:req.userId});
        if(!user)
        {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const result = await userModel.findByIdAndUpdate(req.userId, {firstName,lastName}, {new:true});
        res.status(200).json({
            message: "User updated successfully",
            result
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"Error in updating user",
            error:error.message,
        })
    }
});
userRouter.post("/delete-user",userMiddleware, async (req, res) => {
    try{
        const user= await userModel.findOne({_id:req.userId});
        if(!user)
        {
            return res.status(404).json({
                message: "User not found",
            });
        }
        await userModel.findByIdAndDelete(req.userId);
        res.status(200).json({
            message: "User deleted successfully",
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"Error in deleting user",
            error:error.message,
        })
    }
});
userRouter.post("/purchase",userMiddleware, async (req, res) => {
    const {adminId,propertyId}=req.body;
    try{
        const admin= await adminModel.findOne({_id:adminId});
        const property= await propertyModel.findOne({_id:propertyId});
        if(!admin || !property)
        {
            return res.status(404).json({
                message: "Admin or Property not found",
            });
        }
        const purchase= await purchaseModel.create({
            userId:req.userId,
            adminId,
            propertyId,
            purchaseDate:Date.now()
        })
        res.status(200).json({
            message:"Purchase created successfully",
            purchase
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"Error in creating purchase",
            error:error.message,
        })
    }
});
userRouter.post("/my-purchases",userMiddleware, async (req, res) => {
    try{
        const purchases= await purchaseModel.find({userId:req.userId}).populate("propertyId").populate("adminId");
        if(!purchases)
        {
            return res.status(404).json({
                message: "No purchases found",
            });
        }
        res.status(200).json({
            message:"Purchases fetched successfully",
            purchases
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"Error in fetching purchases",
            error:error.message,
        })  
    }
});
// userRouter.post("/getMyList",userMiddleware, async (req, res) => { });
// userRouter.post("/addToMyList",userMiddleware, async (req, res) => {});
// userRouter.post("/removeFromMyList",userMiddleware, async (req, res) => {});



export default userRouter;



