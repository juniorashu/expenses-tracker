// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './sidebar/Layout'
import LandingPage from './component/Navigation Bar/landPage';
import Auth from './component/Auth/Signup/Auth';
import Dashboard from './component/Dashboard/DashBoard';
import Income from './component/Income/income'
import SignUp from './component/Auth/Signup/Signup';
import Expense from './component/expense/expense';
import Deepseek from './component/deepseek/deepseek';

function App() {
  return (
    <AuthProvider>
  
    { <Layout />}  
  
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/AI' element={<Deepseek />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
