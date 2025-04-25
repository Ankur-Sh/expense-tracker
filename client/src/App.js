// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Expenses</Link>
          <Link to="/add" className="nav-link">Add Expense</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<ExpenseForm />} />
          <Route path="/edit/:id" element={<ExpenseForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
      </footer>
    </Router>
  );
}

export default App;