import mongoose,{Types} from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
})

const adminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
})

const purchaseSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"users",
        required:true
    },
    adminId:
    {
        type:Types.ObjectId,
        ref:"admins",
        required:true
    },
    propertyId:{
        type:Types.ObjectId,
        ref:"properties",
        required:true
    },
    purchaseDate:{
        type:Date,
        default:Date.now
    }
})

const propertySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrls:[String],
    location:{
        type:String,
        required:true
    },
    adminId:{
        type:Types.ObjectId,
        ref:"admins",
        required:true
    },
    //available:
})

export const userModel = mongoose.model("users",userSchema);
export const adminModel = mongoose.model("admins",adminSchema);
export const purchaseModel = mongoose.model("purchases",purchaseSchema);
export const propertyModel = mongoose.model("properties",propertySchema);