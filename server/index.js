const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
