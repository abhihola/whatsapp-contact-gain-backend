const express = require('express');
const router = express.Router();
const AdminSettings = require('../models/AdminSettings');

// Get current settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await AdminSettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update default message
router.post('/update-message', async (req, res) => {
  try {
    const { defaultMessage } = req.body;
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings({ defaultMessage });
    } else {
      settings.defaultMessage = defaultMessage;
    }
    await settings.save();
    res.json({ message: 'Message updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
