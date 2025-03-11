const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendVCFToUser } = require('../utils/emailSender');

// Add user and send VCF email
router.post('/add', async (req, res) => {
  try {
    const { name, whatsappNumber, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ whatsappNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const user = new User({ name, whatsappNumber, email });
    await user.save();

    // Send VCF email after registration
    await sendVCFToUser(email);

    res.status(201).json({ message: 'User added & VCF sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
