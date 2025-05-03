const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup endpoint hit');
    const { name, email, password, address, role = 'NORMAL_USER' } = req.body;

    const existing = await findUserByEmail(email);
    if (existing) {
      console.log('Signup failed: Email already exists ->', email);
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10); 
    const user = await createUser({
      name,
      email,
      password_hash: hash,
      address,
      role,
    });

    console.log('Signup successful for:', email);
    res.json(user);
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log('Login endpoint hit');
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Login failed: Email not found ->', email);
      return res.status(400).json({ error: 'Invalid email credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Login failed: Password mismatch for ->', email);
      return res.status(400).json({ error: 'Invalid password credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Login successful for:', email);
    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
