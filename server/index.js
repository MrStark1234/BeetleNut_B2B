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
const ALLOWED_ORIGINS = [
  "https://beetle-nut.vercel.app", // your production frontend
  // "http://localhost:5173",      // optional: local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow no-origin (e.g., curl/postman) and exact matches
      if (!origin || ALLOWED_ORIGINS.includes(origin))
        return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // keep false unless setting cookies
    maxAge: 600, // cache preflight for 10 min
  })
);

// Important: handle OPTIONS quickly (some hosts need explicit)
app.options("*", cors());
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
