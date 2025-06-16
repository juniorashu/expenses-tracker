import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, getIdToken } from 'firebase/auth'; // ✅ Import Firebase auth
import './expenseform.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount, date, category };

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert('You must be logged in to add expenses.');
        return;
      }

      const token = await getIdToken(user); // ✅ Get ID token

      const res = await axios.post(
        'http://localhost:5000/api/expenses',
        newExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in headers
          },
        }
      );

      onAddExpense(res.data);

      // Clear form
      setTitle('');
      setAmount('');
      setDate('');
      setCategory('');
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Failed to submit expense. Make sure you are logged in.');
    }
  };

  return (
    <div className="page">
      <h2>Submit Your Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
