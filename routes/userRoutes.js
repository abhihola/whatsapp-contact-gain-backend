const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get referral count
router.get("/referrals", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ referralCount: user.referralCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Check premium status
router.get("/premium", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ isPremium: user.isPremium });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
