const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assume User model is set up
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Add JWT secret in your .env file

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    console.log("Hello This is completed");
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' });

    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
