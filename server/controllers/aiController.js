// server/controllers/aiController.js
const Product = require("../models/productModel");
const { askGemini } = require("../lib/gemini");

/**
 * POST /api/ai/product-qa
 * body: { productId: string, question: string }
 */
async function productQA(req, res) {
  try {
    const { productId, question } = req.body || {};
    if (!productId || !question) {
      return res
        .status(400)
        .json({ error: "productId and question are required" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Build concise context from schema fields
    const ctx = [];
    if (product.name) ctx.push(`Name: ${product.name}`);
    if (product.type) ctx.push(`Type: ${product.type}`);
    if (product.category) ctx.push(`Category: ${product.category}`);
    if (product.material) ctx.push(`Material: ${product.material}`);
    if (product.cultivationType)
      ctx.push(`Cultivation Type: ${product.cultivationType}`);
    if (product.colour) ctx.push(`Colour: ${product.colour}`);
    if (product.feature) ctx.push(`Feature: ${product.feature}`);
    if (product.description) ctx.push(`Description: ${product.description}`);
    if (product.country_of_origin)
      ctx.push(`Country of Origin: ${product.country_of_origin}`);
    if (product.packagingType)
      ctx.push(`Packaging Type: ${product.packagingType}`);
    if (product.selfLife) ctx.push(`Shelf Life: ${product.selfLife}`);
    if (product.price != null) ctx.push(`Price (indicative): ${product.price}`);
    if (product.originalPrice != null)
      ctx.push(`Original Price: ${product.originalPrice}`);
    if (product.discountPercentage != null)
      ctx.push(`Discount %: ${product.discountPercentage}`);
    if (product.isBestSeller != null)
      ctx.push(`Best Seller: ${product.isBestSeller ? "Yes" : "No"}`);
    if (product.stock != null) ctx.push(`Stock: ${product.stock}`);
    if (Array.isArray(product.businessType) && product.businessType.length)
      ctx.push(`Business Type: ${product.businessType.join(", ")}`);
    if (Array.isArray(product.packSizes) && product.packSizes.length)
      ctx.push(`Pack Sizes: ${product.packSizes.join(", ")}`);

    const context = ctx.join("\n");

    const system =
      "You are an ecommerce product assistant. Answer only using the Product Context. If missing, say 'Not available in product context.'";

    const answer = await askGemini({
      system,
      user: question,
      context,
      maxTokens: 280,
      temperature: 0.4,
      model: "gemini-2.5-flash",
    });

    return res.json({ ok: true, productId, answer });
  } catch (err) {
    const status = err?.status || err?.response?.status || 500;
    console.error("Gemini product-qa error:", status, err?.message || err);
    if (status === 429) {
      return res.status(429).json({
        error: "Gemini rate/quota limit reached. Try later or enable billing.",
      });
    }
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid Gemini API key or auth. Check GEMINI_API_KEY.",
      });
    }
    return res.status(500).json({ error: "AI service failed" });
  }
}

module.exports = { productQA };
