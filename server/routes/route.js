// routes.js
const express = require('express');
const expenseController = require('../controller/expense.controller.js');
const cors = require('cors');
const router = express.Router();

router.options('/expenses', cors());
router.options('/expenses/:id', cors());

router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;