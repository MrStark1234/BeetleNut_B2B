const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dvgibllus",
  api_key: process.env.CLOUDINARY_API_KEY || "691692613339635",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "a-fks-B7RlyA3bpoVzW_jaUFxPM",
});

module.exports = cloudinary;
