const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  prodName: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  country_city: { type: String },

  productType: { type: String, required: true }, // whole, sliced etc
  quantity: { type: String }, // e.g. '5 tons' or '250 Kg'
  packaging: { type: String },
  businessFrequency: { type: String }, // one-time, monthly etc
  message: { type: String },
  agreeToContact: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Inquiry", inquirySchema);
