import { Request, Response } from "express";
import Property from "../models/Property";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createProperty = async (req: MulterRequest, res: Response) => {
  try {
    const{
        title,
        bhk,
        cost,
        priceRange,
        location,
    }=req.body;
    const imageUrl=req.file?.path;
    const newProperty = new Property(
        {
            title,
            bhk,
            cost,
            priceRange,
            location,
            imageUrl
        }
    );
    await newProperty.save();
    res.status(201).json(newProperty);
  }
   catch (error) {
    res.status(500).json({ error: "Failed to create property" });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const updateProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateProperty) {
      res.status(404).json({ error: "Property not Found" });
    }
    res.json(updateProperty);
  } catch (error) {
    res.status(500).json({ error: "failed to update property" });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const deleteProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deleteProperty) {
      res.status(404).json({ error: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
