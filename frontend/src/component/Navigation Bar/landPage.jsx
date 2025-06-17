import React, { useState } from 'react';
import './landingpage.css';
import { useNavigate } from 'react-router-dom';

const ExpenseTrackerLanding = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const navigate = useNavigate();
 

  return (
    <div className="expense-tracker-landing">
      {/* Animated Gradient Header */}
      <header className="gradient-header">
        <nav className="glass-nav">
          <div className="logo">
            <span className="logo-icon">💰</span> 
            <span>SpendWise</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><button className="nav-cta"  onClick={() => navigate('/auth')}>Get Started</button></li>
          </ul>
        </nav>

        <div className="hero">
          <div className="hero-content">
            <h1>Take Control of <span className="highlight">Your Money</span></h1>
            <p className="hero-subtext">Track expenses, set budgets, and achieve financial freedom with our AI-powered tool.</p>
            <div className="cta-buttons">
              <button className="primary-cta" onClick={() => navigate('/auth')}>
                Start Free Trial <span className="arrow">→</span>
              </button>
              <button className="secondary-cta">
                See Demo
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-mockup"><div className="dashboard-mockup">
  {/* Top Navigation Bar */}
  <div className="mock-nav">
    <span className="mock-nav-icon">←</span>
    <span className="mock-nav-title">March 2024</span>
    <span className="mock-nav-icon">⚙️</span>
  </div>

  {/* Balance Card */}
  <div className="mock-balance-card">
    <div className="mock-balance">
      <span className="mock-label">Total Balance</span>
      <span className="mock-amount">8,245.50frs</span>
    </div>
    <div className="mock-balance-stats">
      <div>
        <span className="mock-label">Income</span>
        <span className="mock-amount positive">+4,200frs</span>
      </div>
      <div>
        <span className="mock-label">Expenses</span>
        <span className="mock-amount negative">-1,954frs</span>
      </div>
    </div>
  </div>

  {/* Chart */}
  <div className="mock-chart">
    <div className="mock-chart-line" style={{ height: '30%' }}></div>
    <div className="mock-chart-line" style={{ height: '70%' }}></div>
    <div className="mock-chart-line" style={{ height: '45%' }}></div>
    <div className="mock-chart-line" style={{ height: '90%' }}></div>
    <div className="mock-chart-line" style={{ height: '60%' }}></div>
    <div className="mock-chart-line" style={{ height: '20%' }}></div>
    <div className="mock-chart-line" style={{ height: '40%' }}></div>
  </div>

  {/* Budget Cards */}
  <div className="mock-budget-cards">
    <div className="mock-budget-card">
      <span className="mock-category">🍔 Food</span>
      <div className="mock-progress-bar">
        <div className="mock-progress-fill" style={{ width: '65%' }}></div>
      </div>
      <span className="mock-amount">325frs/500frs</span>
    </div>
    <div className="mock-budget-card">
      <span className="mock-category">🚗 Transport</span>
      <div className="mock-progress-bar">
        <div className="mock-progress-fill" style={{ width: '30%' }}></div>
      </div>
      <span className="mock-amount">90frs/300frs</span>
    </div>
  </div>

  {/* Recent Transactions */}
  <div className="mock-transactions">
    <div className="mock-transaction">
      <span className="mock-icon">🛒</span>
      <div className="mock-details">
        <span className="mock-merchant">Grocery Store</span>
        <span className="mock-date">Today, 3:45 PM</span>
      </div>
      <span className="mock-amount negative">-86.30frs</span>
    </div>
    <div className="mock-transaction">
      <span className="mock-icon">💰</span>
      <div className="mock-details">
        <span className="mock-merchant">Salary Deposit</span>
        <span className="mock-date">Mar 1, 9:00 AM</span>
      </div>
      <span className="mock-amount positive">+4,200frs</span>
    </div>
  </div>
</div> </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to master your finances</p>
        </div>
        <div className="features-grid">
          {[
            {
              icon: '📊',
              title: 'Real-Time Analytics',
              desc: 'Live spending breakdowns with beautiful charts'
            },
            {
              icon: '🤖',
              title: 'AI Predictions',
              desc: 'Forecast future spending patterns'
            },
            {
              icon: '🔔',
              title: 'Smart Alerts',
              desc: 'Get notified before overspending'
            },
            {
              icon: '🔄',
              title: 'Auto-Sync',
              desc: 'Connect all your bank accounts'
            },
            {
              icon: '🎯',
              title: 'Goal Tracking',
              desc: 'Save for vacations, homes, or retirement'
            },
            {
              icon: '👨‍👩‍👧',
              title: 'Family Mode',
              desc: 'Shared budgets with permissions'
            }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in just 3 simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Accounts</h3>
            <p>Securely link your bank, credit cards, and investments</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Set Budgets</h3>
            <p>Create custom budgets for different categories</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track & Optimize</h3>
            <p>Get insights to improve your spending habits</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Simple Pricing</h2>
          <p>Choose the plan that fits your needs</p>
        </div>
        <div className="toggle-container">
          <button 
            className={`toggle-option ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-option ${activeTab === 'yearly' ? 'active' : ''}`}
            onClick={() => setActiveTab('yearly')}
          >
            Yearly (Save 30%)
          </button>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">
              {activeTab === 'monthly' ? '4.99frs' : '3.49frs'}
              <span>/mo</span>
            </div>
            <ul className="features-list">
              <li>✓ Expense Tracking</li>
              <li>✓ Basic Reports</li>
              <li>✓ 2 Account Connections</li>
              <li>✗ AI Predictions</li>
            </ul>
            <button className="pricing-cta"  onClick={() => navigate('/auth')}>Get Started</button>
          </div>
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">
              {activeTab === 'monthly' ? '9.99frs' : '6.99frs'}
              <span>/mo</span>
            </div>
            <ul className="features-list">
              <li>✓ All Basic Features</li>
              <li>✓ Advanced Analytics</li>
              <li>✓ Unlimited Accounts</li>
              <li>✓ AI Predictions</li>
            </ul>
            <button className="pricing-cta primary"  onClick={() => navigate('/auth')}>Try 7 Days Free</button>
          </div>
          <div className="pricing-card">
            <h3>Family</h3>
            <div className="price">
              {activeTab === 'monthly' ? '14.99frs' : '10.49frs'}
              <span>/mo</span>
            </div>
            <ul className="features-list">
              <li>✓ All Pro Features</li>
              <li>✓ Up to 5 Users</li>
              <li>✓ Shared Budgets</li>
              <li>✓ Priority Support</li>
            </ul>
            <button className="pricing-cta"  onClick={() => navigate('/auth')} >Get Started</button>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2>Ready to Transform Your Finances?</h2>
          <p>Join over 1 million users who've saved an average of 3,000frs/year</p>
          <button className="primary-cta large"  onClick={() => navigate('/auth')}>
            Start Your Free Trial <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">💰</span> 
            <span>SpendWise</span>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Apps</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Help Center</a>
              <a href="#">Webinars</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 SpendWise. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExpenseTrackerLanding;