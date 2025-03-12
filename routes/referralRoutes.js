const express = require('express');
const Referral = require('../models/Referral'); // Make sure you have this model
const router = express.Router();

// Get all referrals
router.get('/', async (req, res) => {
    try {
        const referrals = await Referral.find();
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Add a new referral
router.post('/', async (req, res) => {
    const { referrer, referredUser } = req.body;
    try {
        const newReferral = new Referral({ referrer, referredUser });
        await newReferral.save();
        res.status(201).json({ message: 'Referral added successfully', newReferral });
    } catch (error) {
        res.status(500).json({ message: 'Error adding referral', error });
    }
});

module.exports = router;
