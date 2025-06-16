import React, { useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './Expense.css';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch expenses on load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Get Firebase token
  const getToken = async () => {
    const user = getAuth().currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const fetchExpenses = async () => {
    const token = await getToken();
    if (!token) return;

    axios.get('http://localhost:5000/api/expenses', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setExpenses(res.data);
      calculateTotal(res.data);
    })
    .catch((err) => console.error('Error fetching expenses:', err));
  };

  const calculateTotal = (expenseList) => {
    const totalAmount = expenseList.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotal(totalAmount);
  };

  const addExpenseToList = (newExpense) => {
    const updatedList = [...expenses, newExpense];
    setExpenses(updatedList);
    calculateTotal(updatedList);
  };

  const handleDelete = async (id) => {
    const token = await getToken();
    if (!token) return;

    axios.delete(`http://localhost:5000/api/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      fetchExpenses(); // Refresh the list after deletion
    })
    .catch((err) => console.error('Error deleting expense:', err));
  };

  return (
    <div className="expense-page">
      <main className="main-content">
        <div className="expense-form">
          <ExpenseForm onAddExpense={addExpenseToList} />
        </div>
        <div className="expense-list">
          <h2>Your Expenses</h2>
          <h3>Total: ${total.toFixed(2)}</h3>
          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            <ul>
              {expenses.map((item) => (
                <div key={item._id} className="income-card">
                  <div className="icon">&#128176;</div>
                  <div className="details">
                    <h4>{item.title}</h4>
                    <p><strong>${item.amount}</strong></p>
                    <p>📅 {new Date(item.date).toLocaleDateString()}</p>
                    <p>📂 {item.category}</p>
                    <p>💬 {item.description || 'No description'}</p>
                  </div>
                  <button className="delete-button" onClick={() => handleDelete(item._id)}>🗑️</button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Expense;
