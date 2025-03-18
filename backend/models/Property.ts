import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  bhk: { type: String, required: true },
  cost: { type: String, required: true },
  priceRange: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true }, // ✅ Ensure this field exists
});

const Property = mongoose.model("Property", PropertySchema);
export default Property;
