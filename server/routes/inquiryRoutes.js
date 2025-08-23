const express = require("express");
const {
  addInquiry,
  getInquiries,
} = require("../controllers/inquiryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", addInquiry); // Public: anyone can send
router.get("/", protect, getInquiries); // Admin Only

module.exports = router;
