import router from "express";
import express from "express";
import {propertyModel} from "../db.js";

const propertyRouter = express.Router();
propertyRouter.post("/addProperty",async(req,res)=>{})
propertyRouter.post("/getProperties",async(req,res)=>{})
propertyRouter.post("/getProperty",async(req,res)=>{})

export default propertyRouter;