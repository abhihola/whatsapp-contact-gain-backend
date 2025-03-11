const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Add user (Fixes "Cannot GET /api/users/add")
router.post('/add', async (req, res) => {
  try {
    const { name, whatsappNumber, email } = req.body;
    const user = new User({ name, whatsappNumber, email });
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
