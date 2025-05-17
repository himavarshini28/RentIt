import {userModel} from "../db.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {});
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



