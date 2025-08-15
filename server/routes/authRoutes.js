const express = require("express");
const { register, login } = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register); // Use only once to register initial admin
router.post("/login", login);

module.exports = router;
