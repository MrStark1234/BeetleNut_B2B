const Inquiry = require("../models/inquiryModel");

const addInquiry = async (req, res) => {
  try {
    const {
      name,
      prodName,
      company,
      email,
      phone,
      country_city,
      productType,
      quantity,
      packaging,
      businessFrequency,
      message,
      agreeToContact,
    } = req.body;

    if (!name || !email || !productType || !agreeToContact || !prodName) {
      return res
        .status(400)
        .json({ error: "Please fill required fields and agree to contact." });
    }
    const inquiry = await Inquiry.create({
      name,
      prodName,
      company,
      email,
      phone,
      country_city,
      productType,
      quantity,
      packaging,
      businessFrequency,
      message,
      agreeToContact,
    });
    res.status(201).json({ message: "Inquiry received. Thank you!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addInquiry, getInquiries };
