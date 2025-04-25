const express = require('express');
const expenseController = require('../controller/expense.controller.js');
const cors = require('cors');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware.js');

router.options('/expenses', cors());
router.options('/expenses/:id', cors());

// Apply the authenticate middleware to all expense routes
router.use('/expenses', authenticate);

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;