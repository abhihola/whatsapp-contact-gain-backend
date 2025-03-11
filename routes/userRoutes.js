const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add', async (req, res) => {
  try {
    const { name, whatsappNumber, email, language } = req.body;
    const user = new User({ name, whatsappNumber, email, language });
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
