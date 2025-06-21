import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.OPENAI_API_KEY_TOKEN, // stored in your .env file
});

/**
 * Generate a financial summary from transaction data
 * @param {Array} transactions - List of transactions (amount, type, description, date)
 */
export async function generateSummary(transactions) {
  const formattedList = transactions.map((tx, index) => {
    return `${index + 1}. ${tx.type.toUpperCase()}: ₦${tx.amount} | ${tx.description} | ${tx.date}`;
  }).join("\n");

  const prompt = `
These are my transactions:

${formattedList}

Please summarize:
- Total expenses and income
- Largest spending
- What I spent most on
- Suggest if I need to reduce any spendings
  `;

  

try {
  console.log("prompt", prompt);
  
  console.log("📤 Sending to AI...");
  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-3.5-turbo",

  });

  console.log("✅ AI Response:", response.choices[0].message.content);
  return response.choices[0].message.content;
} catch (err) {
  console.error("❌ AI Error:", err.response?.data || err.message);
  throw new Error("AI summary failed");
}

}
