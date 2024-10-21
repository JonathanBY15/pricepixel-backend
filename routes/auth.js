// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const { validateSignup, validateLogin } = require('../utils/validators');

// const router = express.Router();

// // Signup Route
// router.post('/signup', validateSignup, signup);

// // Login Route
// router.post('/login', validateLogin, login);

// module.exports = router;



// authRoutes.js

const express = require('express');
const { signup, login, getUserInfo } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../utils/validators');
const auth = require('../middleware/auth'); // Import the auth middleware

const router = express.Router();

// Signup Route
router.post('/signup', validateSignup, signup);

// Login Route
router.post('/login', validateLogin, login);

// New route to get user info
router.get('/user', auth, getUserInfo); // Protect this route with authentication middleware

module.exports = router;
