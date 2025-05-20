import router from "express";
import express from "express";
import {propertyModel} from "../db.js";

const propertyRouter = express.Router();

propertyRouter.post("/get-properties",async(req,res)=>{
    try{
        const properties = await propertyModel.find({});
        res.status(200).json({
            message:"fetched all properties",
            properties,
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"error fetching properties",
            error:error.message
        })
    }
})
propertyRouter.post("/get-property",async(req,res)=>{
    const {propertyId}=req.body;
    try{
        const property = await propertyModel.findOne({_id:propertyId})
        if(!property)
        {
            res.status(404).json({
                message:"property not found"
            })
        }
        res.status(200).json({
            message:"property found",
            property
        })
    }
    catch(error)
    {
        res.status(500).json({
            message:"error while fetching property",
            error:error.message
        })
    }
})

export default propertyRouter;