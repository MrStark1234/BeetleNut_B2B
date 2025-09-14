// server/controllers/aiController.js
const Product = require("../models/productModel");
const { askGemini } = require("../lib/gemini");

/**
 * POST /api/ai/product-qa
 * body: { productId: string, question: string }
 */
async function productQA(req, res) {
  // Basic input guard
  const { productId, question } = req.body || {};
  if (!productId || !question || typeof question !== "string") {
    return res
      .status(400)
      .json({ error: "productId and question (string) are required" });
  }

  try {
    // Fetch product
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

    // Safe truncation to avoid oversized prompts
    const contextRaw = ctx.join("\n");
    const MAX_CONTEXT_CHARS = 6000; // conservative cap
    const context =
      contextRaw.length > MAX_CONTEXT_CHARS
        ? contextRaw.slice(0, MAX_CONTEXT_CHARS) + "\n…"
        : contextRaw;

    const system =
      "You are an ecommerce product assistant. Answer only using the Product Context. If missing, say 'Not available in product context.' Keep answers under 120 words.";

    // Retry helper with exponential backoff for transient errors
    async function withBackoff(fn, tries = 4, base = 1200) {
      for (let i = 0; i < tries; i++) {
        try {
          return await fn();
        } catch (e) {
          const status = e?.status || e?.response?.status;
          // Retry only on transient statuses
          if (![429, 500, 503].includes(status) || i === tries - 1) {
            throw e;
          }
          const delay = base * 2 ** i + Math.floor(Math.random() * 250);
          await new Promise((r) => setTimeout(r, delay));
        }
      }
    }

    // Primary model call with retry
    let answer;
    try {
      answer = await withBackoff(() =>
        askGemini({
          system,
          user: String(question).trim(),
          context,
          maxTokens: 280,
          temperature: 0.4,
          model: "gemini-2.5-flash",
        })
      );
    } catch (primaryErr) {
      // Fallback to lighter variant on persistent overload/internal error
      answer = await withBackoff(() =>
        askGemini({
          system,
          user: String(question).trim(),
          context,
          maxTokens: 280,
          temperature: 0.4,
          model: "gemini-2.5-flash-8b",
        })
      );
    }

    return res.json({ ok: true, productId, answer });
  } catch (err) {
    const status = err?.status || err?.response?.status || 500;
    const message =
      err?.message ||
      err?.response?.data?.error?.message ||
      "AI service failed";

    // Structured server-side logging
    console.error("Gemini product-qa error:", {
      status,
      message,
      path: "/api/ai/product-qa",
      productId,
    });

    // Granular error responses
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid Gemini API key or auth. Check GEMINI_API_KEY.",
        code: 401,
      });
    }
    if (status === 429) {
      return res.status(429).json({
        error: "Gemini rate/quota limit reached. Try later or enable billing.",
        code: 429,
      });
    }
    if (status === 503) {
      return res.status(503).json({
        error: "Model is overloaded. Please try again shortly.",
        code: 503,
      });
    }
    return res.status(status).json({ error: message, code: status });
  }
}

module.exports = { productQA };
