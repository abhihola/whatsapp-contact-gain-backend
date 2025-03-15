const express = require("express");
const User = require("../models/User");
const Referral = require("../models/Referral");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user referrals
router.get("/", authMiddleware, async (req, res) => {
    try {
        const referrals = await Referral.find({ referredBy: req.user.userId }).populate("referredUser", "name email");
        res.json({ referrals, count: referrals.length });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Add a referral
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { referredUserId } = req.body;

        const referredUser = await User.findById(referredUserId);
        if (!referredUser) return res.status(404).json({ message: "User not found" });

        const referral = new Referral({ referredBy: req.user.userId, referredUser: referredUserId });
        await referral.save();

        // Update referral count
        const user = await User.findById(req.user.userId);
        user.referralCount += 1;

        // Grant premium access if 10 referrals reached
        if (user.referralCount >= 10 && !user.isPremium) {
            user.isPremium = true;
        }

        await user.save();
        res.status(201).json({ message: "Referral added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Get top 3 referrers of the month
router.get("/top", async (req, res) => {
    try {
        const topReferrers = await User.find().sort({ referralCount: -1 }).limit(3).select("name email referralCount");
        res.json(topReferrers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
