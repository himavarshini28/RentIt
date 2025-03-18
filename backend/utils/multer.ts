import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "rental-houses",
    format: file.mimetype.split("/")[1], // Auto-detects format (jpg, png, etc.)
    public_id: `${Date.now()}-${file.originalname}`, // Unique filename
  }),
});

const upload = multer({ storage });

export default upload; 
