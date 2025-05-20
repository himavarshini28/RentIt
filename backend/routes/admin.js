import router from "express";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminModel, propertyModel } from "../db.js";
import { adminVerification } from "../zod/adminVerification.js";
import adminMiddleware from "../middlewares/admin.js";
import { propertyVerification } from "../zod/propertyVerification.js";

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
          message: "Admin with this email already exists.",
        });
      }
      await adminModel.create({
        email,
        password: await bcrypt.hash(password, 5),
        firstName,
        lastName,
      });
      res.status(200).json({
        message: "Admin created successfully",
      });
    } catch (error) {
      console.log("Error in creating admin", error);
      res.status(500).json({
        message: "Error in creating admin",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid data",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({
      email,
    });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    const verifiedPassword = await bcrypt.compare(password, admin.password);
    if (!verifiedPassword) {
      res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in signing in",
      error: error.message,
    });
  }
});

adminRouter.post("/add-property", adminMiddleware, async (req, res) => {
  const verifiedProperty = await propertyVerification.safeParse(req.body);
  if (!verifiedProperty.success) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }
  try {
    const { name, description, price, imageUrls, location } = req.body;
    const data = { ...verifiedProperty.data, adminId: req.adminId };
    propertyModel.create(data);
    res.status(200).json({
      message: "property Added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding property",
      error: err.message,
    });
  }
});

adminRouter.post("/get-properties", adminMiddleware, async (req, res) => {
  try {
    const adminProperties = await propertyModel.find({ adminId: req.adminId });
    if (!adminProperties) {
      res.status(400).json({
        message: "Invalid request",
      });
    }
    res.status(200).json({
      message: "Properties fetched successfully",
      properties: adminProperties,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching properties",
      error: error.message,
    });
  }
});

adminRouter.post("/delete-property", adminMiddleware, async (req, res) => {
  const { propertyId } = req.body;
  try {
    const property = await propertyModel.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }
    if (property.adminId.toString() !== req.adminId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    await propertyModel.deleteOne({ _id: propertyId });
    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting property",
      error: error.message,
    });
  }
});

adminRouter.post("/update-property", adminMiddleware, async (req, res) => {
    const {propertyId,...rest} = req.body;
    const property = await propertyModel.findById(propertyId);
    if(!property)
    {
        return res.status(404).json({
            message: "Property not found",
        });
    }
    if(property.adminId.toString() !== req.adminId)
    {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const verifiedProperty = await propertyVerification.safeParse(rest);
    if(!verifiedProperty.success) {
        return res.status(400).json({
            message: "Invalid data",
        });
    }
    const updatedProperty = {...verifiedProperty.data, adminId: req.adminId };
    try{
        const result = await propertyModel.findByIdAndUpdate(propertyId, updatedProperty, {new:true});
        res.status(200).json({
            message: "Property updated successfully",
            result
        })
    }
    catch(error)
    {
        res.status(500).json(
            {
                message: "Error in updating property",
                error: error.message,
            }
        )
    }
});

adminRouter.post("/profile", adminMiddleware, async (req, res) => {
    try{
        const admin = await adminModel.findById(req.adminId);
        if(!admin)
        {
            res.status(404).json(
                {
                    message:"Admin not found",
                }
            )
        }
        res.status(200).json(
            {
                message:"Admin profile fetched successfully",
                admin
            }
        )
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:"Error in fetching admin profile",
                error: error.message,
            }
        )
    }
});

adminRouter.post("/update-admin", adminMiddleware, async (req, res) => {
    const {firstName,lastName} = req.body;
    try{
     const admin = await adminModel.findOne({_id:req.adminId});
     if(!admin)
     {
        return res.status(404).json({
            message: "Admin not found",
        });
     }
        const result = await adminModel.findByIdAndUpdate(req.adminId, {firstName,lastName}, {new:true});
        res.status(200).json({
            message: "Admin updated successfully",
            result
        })
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:"Error in updating admin",
                error: error.message,
            }
        )
    }
});

export default adminRouter;
