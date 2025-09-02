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
      status,
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
      status,
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

const deleteInquiries = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("deleteInquiry error:", err);
    const code = err.name === "CastError" ? 400 : 500;
    return res.status(code).json({ error: err.message });
  }
};

const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();

    res.json({ message: "Status updated successfully", inquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiries,
};
