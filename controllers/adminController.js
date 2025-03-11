const User = require('../models/User');
const fs = require('fs');
const { Parser } = require('json2csv');

// Admin login (placeholder)
exports.adminLogin = (req, res) => {
    res.send({ message: "Admin login not implemented yet" });
};

// Add a user manually
exports.addUser = async (req, res) => {
    try {
        const { name, email, whatsappNumber } = req.body;
        const newUser = new User({ name, email, whatsappNumber });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
};

// Remove a user
exports.removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove user' });
    }
};

// Export users to CSV
exports.exportUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email whatsappNumber');
        const parser = new Parser({ fields: ['name', 'email', 'whatsappNumber'] });
        const csv = parser.parse(users);

        res.header('Content-Type', 'text/csv');
        res.attachment('users.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Failed to export users' });
    }
};

// Toggle premium access
exports.togglePremiumAccess = (req, res) => {
    res.json({ message: "Premium access toggled (not implemented yet)" });
};

// Toggle referral notifications
exports.toggleReferralNotifications = (req, res) => {
    res.json({ message: "Referral notifications toggled (not implemented yet)" });
};
