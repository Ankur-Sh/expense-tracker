import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ExpenseForm.css';

function ExpenseForm() {
  const [form, setForm] = useState({ amount: '', category: '', description: '', date: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get('http://localhost:5001/api/expenses')
        .then(res => {
          const exp = res.data.find(e => e._id === id);
          if (exp) setForm(exp);
        })
        .catch(error => console.error("Error fetching expense:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5001/api/expenses/${id}`, form);
      } else {
        await axios.post('http://localhost:5001/api/expenses', form);
      }
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>{id ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={form.date?.slice(0, 10)} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </div>
        <button type="submit" className="submit-button">{id ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
}

export default ExpenseForm;