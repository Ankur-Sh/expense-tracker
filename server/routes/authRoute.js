// routes/authRoute.js
const express = require('express');
const cors = require('cors');
const router = express.Router();
const authController = require('../controller/authController.js'); // Assuming you'll create this

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
// router.post('/logout', authController.logout);

module.exports = router;