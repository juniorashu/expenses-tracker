// routes/expenseRoute.js
import express from 'express';
import Expense from '../models/Expense.js';
import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js';

const router = express.Router();

// ✅ Get all expenses for the logged-in user
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.uid });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// ✅ Add a new expense for the logged-in user
router.post('/', verifyFirebaseToken, async (req, res) => {
  const { title, amount, date, category } = req.body;
  
  try {
    const expense = await Expense.create({
      title,
      amount,
      date,
      category,
      user: req.user.uid, // ⬅️ Associate with user
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete a specific expense for the logged-in user
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.uid, // ⬅️ Ensure ownership
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found or not yours' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
