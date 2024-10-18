const express = require('express');
const { signup, login } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../utils/validators');

const router = express.Router();

// Signup Route
router.post('/signup', validateSignup, signup);

// Login Route
router.post('/login', validateLogin, login);

module.exports = router;
