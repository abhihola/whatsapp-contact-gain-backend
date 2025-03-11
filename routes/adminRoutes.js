const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { Parser } = require('json2csv');

router.get('/export-users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) return res.status(404).json({ error: 'No users found' });

    const parser = new Parser({ fields: ['name', 'whatsappNumber', 'email'] });
    const csv = parser.parse(users);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Error exporting users' });
  }
});

module.exports = router;
