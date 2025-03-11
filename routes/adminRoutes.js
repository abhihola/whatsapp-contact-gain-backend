const express = require('express');
const router = express.Router();
const AdminSettings = require('../models/AdminSettings');

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
