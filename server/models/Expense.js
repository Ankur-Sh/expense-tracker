const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  amount: Number,
  category: String,
  description: String,
  date: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);