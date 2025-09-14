// server/lib/gemini.js
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// Client init; GEMINI_API_KEY env se uthta hai agar pass na karo
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Unified wrapper
async function askGemini({
  system,
  user,
  context,
  maxTokens = 300,
  temperature = 0.4,
  model = "gemini-2.5-flash",
}) {
  // Prompt compose: system + instructions + product context + user question
  const prompt = [
    system || "You are a helpful ecommerce product assistant.",
    "",
    "Use the Product Context to answer user questions.",
    "If information is missing, reply exactly: Not available in product context.",
    "Keep answers under 120 words.",
    "",
    "Product Context:",
    context || "(none)",
    "",
    "User Question:",
    user,
  ].join("\n");

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    // Some SDKs allow generationConfig; current API keeps params minimal
    // generationConfig: { maxOutputTokens: maxTokens, temperature },
  });

  // response.text contains concatenated text from candidates
  const text = response?.text || "";
  return text.trim();
}

module.exports = { askGemini };
