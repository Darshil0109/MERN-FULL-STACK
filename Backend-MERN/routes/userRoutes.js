const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Import models
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const { username, email, password, profilePicture, bio } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      bio
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the created user (excluding the password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: savedUser.username,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
        bio: savedUser.bio,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
