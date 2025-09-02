const express = require("express");
const {
  addInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiries,
} = require("../controllers/inquiryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", addInquiry); // Public: anyone can send
router.get("/", protect, getInquiries); // Admin Only
router.patch("/:id", protect, updateInquiryStatus); //Admin Only
router.delete("/:id", protect, deleteInquiries); //Admin Only

module.exports = router;
