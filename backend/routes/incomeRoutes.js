// routes/incomeRoute.js
import express from 'express';
import Income from '../models/Income.js';
import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js';

const router = express.Router();

// ✅ Get all income entries for the logged-in user
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.uid });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Error fetching income" });
  }
});

// ✅ Add a new income entry for the logged-in user
router.post('/', verifyFirebaseToken, async (req, res) => {
  const { title, amount, date, description } = req.body;

  try {
    const newIncome = await Income.create({
      title,
      amount,
      date,
      description,
      user: req.user.uid, // ⬅️ Associate with user
    });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete income entry by ID for the logged-in user
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.uid, // ⬅️ Make sure it belongs to user
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Income not found or not yours' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
