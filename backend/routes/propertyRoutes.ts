import express from "express";
import { Request, Response, NextFunction } from "express";

import { getAllProperties,getPropertyById,createProperty,updateProperty,deleteProperty} from "../controllers/propertyController";
import upload  from "../utils/multer";

const router =express.Router();



router.post("/", upload.single("image"), createProperty);

  
router.get("/",getAllProperties);
router.get("/:id",getPropertyById);
router.post("/:id",updateProperty);
router.delete("/:id",deleteProperty);

  

export default router;