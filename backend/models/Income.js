// models/Income.js
import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
  user: {
    type: String, // Firebase UID or Mongo _id
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
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Income = mongoose.models.Income || mongoose.model('Income', IncomeSchema);
export default Income;
