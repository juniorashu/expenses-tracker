import { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './addIncome.css';

function AddSalaryForm({ onSalaryAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const token = await user.getIdToken();
      await axios.post('/api/incomes', {
        title, amount, date, description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      onSalaryAdded();
      setTitle('');
      setAmount('');
      setDate('');
      setDescription('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to add salary. Please try again.');
    }
  };

  return (
    <div className="Salary-Form">
      <h2>Add Salary</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Salary</button>
      </form>
    </div>
  );
}

export default AddSalaryForm;
