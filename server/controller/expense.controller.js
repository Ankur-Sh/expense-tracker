// controllers.js
const Expense = require('../models/Expense.js');

async function getAllExpenses(req, res) {
  const expenses = await Expense.find();
  res.json(expenses);
}

async function createExpense(req, res) {
  console.log('Received request body:', req.body);
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ error: 'Failed to save expense' });
  }
}

async function updateExpense(req, res) {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}

async function deleteExpense(req, res) {
  await Expense.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
}

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};