import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import axios from 'axios';
import './Dashboard.css';
import { getToken } from './auth'; // Import the auth helper
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          navigate('/signup'); // Redirect to signup if no token
          return;
        }

        const [incomesRes, expensesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/incomes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setIncomes(incomesRes.data);
        setExpenses(expensesRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "Failed to fetch data");
        if (error.response?.status === 401) {
          navigate('/signup'); // Redirect to signup if unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Rest of your component remains the same...
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  // ... (keep all your chart preparation functions)

  if (loading) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error">{error}</div>;


  const maxIncome = incomes.length ? Math.max(...incomes.map(i => i.amount)) : 0;
  const minIncome = incomes.length ? Math.min(...incomes.map(i => i.amount)) : 0;
  const maxExpense = expenses.length ? Math.max(...expenses.map(e => e.amount)) : 0;
  const minExpense = expenses.length ? Math.min(...expenses.map(e => e.amount)) : 0;

  const recentHistory = [...incomes.map(i => ({ ...i, type: 'income' })), ...expenses.map(e => ({ ...e, type: 'expense' }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // 🧮 Histogram based on dynamic groups
  const prepareHistogramData = () => {
    const incomeGroups = {};
    const expenseGroups = {};

    incomes.forEach(({ amount }) => {
      const group = Math.floor(amount / 500) * 500;
      const label = group < 2000 ? `${group}-${group + 499}` : '2000+';
      incomeGroups[label] = (incomeGroups[label] || 0) + 1;
    });

    expenses.forEach(({ amount }) => {
      const group = Math.floor(amount / 500) * 500;
      const label = group < 2000 ? `${group}-${group + 499}` : '2000+';
      expenseGroups[label] = (expenseGroups[label] || 0) + 1;
    });

    const labels = Array.from(new Set([...Object.keys(incomeGroups), ...Object.keys(expenseGroups)])).sort((a, b) => {
      const parse = str => str.includes('+') ? 9999 : parseInt(str);
      return parse(a) - parse(b);
    });

    return labels.map(label => ({
      name: label,
      Income: incomeGroups[label] || 0,
      Expense: expenseGroups[label] || 0
    }));
  };

  const histogramData = prepareHistogramData();

  // 🗓 Format date to "YYYY-WW" (ISO week)
  const formatWeek = (dateStr) => {
    const date = new Date(dateStr);
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${week.toString().padStart(2, '0')}`;
  };

  // 📈 Prepare line chart data by week
  const prepareLineData = () => {
    const weeks = {};

    incomes.forEach(({ date, amount }) => {
      const week = formatWeek(date);
      if (!weeks[week]) weeks[week] = { week, income: 0, expense: 0 };
      weeks[week].income += amount;
    });

    expenses.forEach(({ date, amount }) => {
      const week = formatWeek(date);
      if (!weeks[week]) weeks[week] = { week, income: 0, expense: 0 };
      weeks[week].expense += amount;
    });

    return Object.values(weeks).sort((a, b) => a.week.localeCompare(b.week));
  };

  const lineData = prepareLineData();

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense }
  ];

  const COLORS = ['#00C49F', '#FF4C4C'];

  if (loading) return <div className="loading">Loading data...</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Expense Tracker Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p className={totalBalance >= 0 ? 'positive' : 'negative'}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Range Cards */}
      <div className="range-cards">
        <div className="range-card">
          <h3>Income Range</h3>
          <div className="range-values">
            <span>Min: ${minIncome.toFixed(2)}</span>
            <span>Max: ${maxIncome.toFixed(2)}</span>
          </div>
        </div>
        <div className="range-card">
          <h3>Expense Range</h3>
          <div className="range-values">
            <span>Min: ${minExpense.toFixed(2)}</span>
            <span>Max: ${maxExpense.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Line Chart */}
        <div className="chart-wrapper">
          <h2>Income vs Expenses (Weekly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis interval="preserveStartEnd" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#00C49F" />
              <Line type="monotone" dataKey="expense" stroke="#FF4C4C" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-wrapper">
          <h2>Income/Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className="chart-wrapper">
          <h2>Transaction Frequency by Amount</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis interval="preserveStartEnd" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#00C49F" />
              <Bar dataKey="Expense" fill="#FF4C4C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent History */}
      <div className="recent-history">
        <h2>Recent Transactions</h2>
        <div className="history-items">
          {recentHistory.map((item, index) => (
            <div key={index} className={`history-item ${item.type === 'income' ? 'income' : 'expense'}`}>
              <div className="history-title">{item.title}</div>
              <div className="history-amount">
                {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
              </div>
              <div className="history-date">{new Date(item.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
