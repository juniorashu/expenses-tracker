// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';

import userRoutes from './routes/useroutes.js';
import IncomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRouter.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Mount routes
app.use('/api/users', userRoutes);         // User routes (sync, get users, etc.)
app.use('/api/incomes', IncomeRoutes);    // Salary routes
app.use('/api/expenses', expenseRoutes);   // Expense routes

// Error handling middleware (should go after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
