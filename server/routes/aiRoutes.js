const express = require("express");
const { productQA } = require("../controllers/aiController");

const router = express.Router();
router.post("/product-qa", productQA);

module.exports = router;
