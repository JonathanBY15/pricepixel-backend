const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
    
    // Generate token
    const token = generateToken(newUser);
    
    res.status(201).json({ message: 'User created', token });
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
