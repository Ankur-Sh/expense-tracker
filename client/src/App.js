import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import './App.css';
import SignupPage from './components/SignupPage.js';
import SigninPage from './components/SigninPage.js';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  const handleSignInSuccess = (username) => {
    setLoggedInUsername(username);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUsername(null);
  };

  return (
    <Router>
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Expenses</Link>
          <Link to="/add" className="nav-link">Add Expense</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
        {loggedInUsername && (
          <div className="header-right">
            <span>Welcome, {loggedInUsername}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
        {!loggedInUsername && (
          <div className="header-right">
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </div>
        )}
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<ExpenseForm />} />
          <Route path="/edit/:id" element={<ExpenseForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage onSignIn={handleSignInSuccess} />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
      </footer>
    </Router>
  );
}

export default App;