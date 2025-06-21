import express from "express";
import { generateExpenseSummary } from "../OPEN_AI/deepseek.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js"; // Middleware to verify Firebase token
import ExpenseModel from "../models/Expense.js";
import IncomeModel from "../models/Income.js";

 // our AI logic

const router = express.Router();

// POST /api/ai/summary

router.post("/summary", verifyFirebaseToken, async (req, res) => {
try {
    console.log("Verified user ID:", req.user.uid);  // Log UID
    const userId = req.user.uid;
    const { prompt } = req.body;

    const expenses = await ExpenseModel.find({ user: userId });
    const incomes = await IncomeModel.find({ user: userId });

    console.log("User expenses:", expenses.length);
    console.log("User incomes:", incomes.length);

    if (expenses.length === 0 && incomes.length === 0) {
      return res.status(404).json({ error: "No expense or income records found for this user." });
    }

    const summary = await generateExpenseSummary([...expenses, ...incomes], prompt);
    res.status(200).json({ summary });
  } catch (error) {
    console.error("AI summary error:", error.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});



export default router;
