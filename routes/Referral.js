const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Referral", ReferralSchema);
