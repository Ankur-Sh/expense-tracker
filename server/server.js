const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/route.js');
const authRoutes= require('./routes/authRoute.js');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Use routes
app.use('/api', expenseRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));