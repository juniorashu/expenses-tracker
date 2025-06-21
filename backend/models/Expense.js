// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: String, // Firebase UID or User _id
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Expense =  mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
