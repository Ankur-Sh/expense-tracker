const Expense = require('../models/Expense.js');

async function getAllExpenses(req, res) {
  const expenses = await Expense.find({ userId: req.user.userId });
  res.json(expenses);
}

async function createExpense(req, res) {
  console.log('Received request body:', req.body);
  try {
    const newExpense = new Expense({ ...req.body, userId: req.user.userId });
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ error: 'Failed to save expense' });
  }
}

async function updateExpense(req, res) {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  if (!updated) {
    return res.status(404).json({ message: 'Expense not found or you are not authorized to update it' });
  }
  res.json(updated);
}

async function deleteExpense(req, res) {
  const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!deleted) {
    return res.status(404).json({ message: 'Expense not found or you are not authorized to delete it' });
  }
  res.sendStatus(204);
}

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};