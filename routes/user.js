const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store referred users
  referralCode: { type: String, unique: true }, // Unique referral code
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Who referred this user
  createdAt: { type: Date, default: Date.now }
});

// Generate a referral code before saving the user
userSchema.pre('save', function (next) {
  if (!this.referralCode) {
    this.referralCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
