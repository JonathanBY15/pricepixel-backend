// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Wishlist = require('../models/wishlist'); // Import the Wishlist model
require('dotenv').config();

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup handler
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = await User.create({ username, hashed_password: hashedPassword });
    
    // Create a wishlist for the new user
    await Wishlist.create({ uid: newUser.uid });

    // Generate token
    const token = generateToken(newUser);
    
    res.status(201).json({ message: 'User created and wishlist added', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login handler
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// New method to get user info
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.uid; // Get user ID from the request (set by the auth middleware)

    // Fetch the user from the database
    const user = await User.findOne({ where: { uid: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the uid and username
    res.json({
      uid: user.uid,
      email: user.username // Assuming username stores the email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
