const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      material,
      cultivationType,
      colour,
      feature,
      type,
      country_of_origin,
      packagingType,
      selfLife,
      price,
      originalPrice, //New
      isBestSeller, //New
      discountPercentage, //New
      stock, //New
      businessType,
      packSizes,
    } = req.body;

    let imageUrl = "";
    if (req.file) {
      const upload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "rajutraders/products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = upload.secure_url;
    }

    // Ensure arrays parsed properly
    const businessTypeArr = Array.isArray(businessType)
      ? businessType
      : typeof businessType === "string"
      ? businessType.split(",").map((x) => x.trim())
      : [];
    const packSizesArr = Array.isArray(packSizes)
      ? packSizes
      : typeof packSizes === "string"
      ? packSizes.split(",").map((x) => x.trim())
      : [];

    const product = new Product({
      name,
      description,
      category,
      material,
      cultivationType,
      colour,
      feature,
      type,
      country_of_origin,
      packagingType,
      selfLife,
      price,
      originalPrice, //New
      isBestSeller, //New
      discountPercentage, //New
      stock, //New
      businessType: businessTypeArr,
      packSizes: packSizesArr,
      imageUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one Product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      material,
      cultivationType,
      colour,
      feature,
      type,
      country_of_origin,
      packagingType,
      selfLife,
      price,
      originalPrice, //New
      isBestSeller, //New
      discountPercentage, //New
      stock, //New
      businessType,
      packSizes,
    } = req.body;

    let updateData = {
      name,
      description,
      category,
      material,
      cultivationType,
      colour,
      feature,
      type,
      country_of_origin,
      packagingType,
      selfLife,
      price,
      originalPrice, //New
      isBestSeller, //New
      discountPercentage, //New
      stock, //New
    };

    // Arrays
    if (businessType)
      updateData.businessType = Array.isArray(businessType)
        ? businessType
        : businessType.split(",").map((x) => x.trim());
    if (packSizes)
      updateData.packSizes = Array.isArray(packSizes)
        ? packSizes
        : packSizes.split(",").map((x) => x.trim());

    // Image upload
    if (req.file) {
      const upload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "rajutraders/products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.imageUrl = upload.secure_url;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
