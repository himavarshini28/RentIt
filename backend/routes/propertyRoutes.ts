import express from "express";

import { getAllProperties,getPropertyById,createProperty,updateProperty,deleteProperty} from "../controllers/propertyController";

const router =express.Router();

router.post("/",createProperty);
router.get("/",getAllProperties);
router.get("/:id",getPropertyById);
router.post("/:id",updateProperty);
router.delete("/:id",deleteProperty);

export default router;