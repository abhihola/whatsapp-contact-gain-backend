const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, whatsappNumber, referralCode } = req.body;
        const newUser = new User({ name, email, whatsappNumber, referralCode });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email whatsappNumber referralCode');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Add referral
exports.addReferral = async (req, res) => {
    try {
        const { userId, referredBy } = req.body;
        await User.findByIdAndUpdate(userId, { referredBy });
        res.status(200).json({ message: 'Referral added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add referral' });
    }
};

// Get user referrals
exports.getUserReferrals = async (req, res) => {
    try {
        const userId = req.params.id;
        const referrals = await User.find({ referredBy: userId });
        res.status(200).json(referrals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get referrals' });
    }
};
