const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/emailSender");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, referralCode } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, verified: false });

        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                user.referredBy = referrer._id;
                referrer.referralCount += 1;
                await referrer.save();
            }
        }

        await user.save();
        sendVerificationEmail(user.email, user._id);

        res.status(201).json({ message: "User registered. Verify your email." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Email Verification
router.get("/verify/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { verified: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Email verified successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.verified) return res.status(400).json({ message: "Verify your email first" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        sendResetPasswordEmail(user.email, user._id);
        res.json({ message: "Reset password email sent" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Reset Password
router.post("/reset-password/:userId", async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(req.params.userId, { password: hashedPassword });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
