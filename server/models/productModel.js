const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  material: String,
  cultivationType: String,
  colour: String,
  feature: String,
  type: String,
  country_of_origin: String,
  packagingType: String,
  selfLife: String,
  price: Number,
  originalPrice: Number, //New
  isBestSeller: Boolean, //New
  discountPercentage: Number, //New
  stock: Number, //New
  imageUrl: String, // Cloudinary URL
  businessType: [String],
  packSizes: [String],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Product", productSchema);
