import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ExpenseList.css';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5001/api/expenses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [token]);

  return (
    <div className="expense-list-container">
      <h2>All Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(exp => (
            <li key={exp._id} className="expense-item">
              <div className="expense-details">
                <span className="amount">${exp.amount.toFixed(2)}</span>
                <span className="category">{exp.category}</span>
                <span className="date">{new Date(exp.date).toLocaleDateString()}</span>
                {exp.description && <span className="description">({exp.description})</span>}
              </div>
              <div className="expense-actions">
                <Link to={`/edit/${exp._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(exp._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;