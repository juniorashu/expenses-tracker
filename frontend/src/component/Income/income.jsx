import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './Income.css';
import AddSalaryForm from './addIncomeform';

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchincomes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const token = await user.getIdToken();
    axios.get('http://localhost:5000/api/incomes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setIncomes(res.data);
        const total = res.data.reduce((sum, entry) => sum + Number(entry.amount), 0);
        setTotalIncome(total);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchincomes();
  }, []);

  const handleDelete = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const token = await user.getIdToken();
    axios.delete(`http://localhost:5000/api/incomes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => fetchincomes())
      .catch((err) => console.error(err));
  };

  return (
    <div className="income-container">
      <AddSalaryForm onSalaryAdded={fetchincomes} />
      <div className="income-display">
        <h2>Total Income: <span className="green">${totalIncome}</span></h2>
        <div className="income-list">
          {incomes.map((item) => (
            <div key={item._id} className="income-card">
              <div className="icon">&#128176;</div>
              <div className="details">
                <h4>{item.title}</h4>
                <p><strong>${item.amount}</strong></p>
                <p>📅 {item.date}</p>
                <p>💬 {item.description}</p>
              </div>
              <button className="delete-button" onClick={() => handleDelete(item._id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Income;
