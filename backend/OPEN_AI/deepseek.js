// backend/OPEN_AI/deepseek.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000", // Replace with your real site URL in production
    "X-Title": "ExpenseTrackerApp",
  },
});

/**
 * Generate AI summary of financial transactions
 * @param {Array} transactions - List of user's income or expense data
 * @param {string} userPrompt - (Optional) User's question or command
 * @returns {string} - AI-generated summary
 */
export async function generateExpenseSummary(transactions, userPrompt = "") {
  if (!transactions || !Array.isArray(transactions)) {
    throw new Error("Invalid transactions array passed to AI summary.");
  }

  const formatted = transactions.map((t, i) => {
    const date = new Date(t.date).toLocaleDateString();
    return `${i + 1}. ${t.type?.toUpperCase?.() || "TRANSACTION"}: ₦${t.amount} | ${t.description} | ${date}`;
  }).join("\n");

  const prompt = userPrompt?.trim()
    ? `These are my transactions:\n\n${formatted}\n\nUser question: ${userPrompt}`
    : `These are my financial transactions:\n\n${formatted}\n\nGive a summary:\n- Total expenses and income\n- Highest spending\n- Spending categories\n- Any savings advice`;

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content?.trim() || "⚠️ No response from AI.";
  } catch (err) {
    console.error("❌ DeepSeek AI Error:", err?.response?.data || err.message);
    throw new Error("Failed to generate summary from DeepSeek AI.");
  }
}
