//otp model
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Unique email field
    otp: { type: String, required: true }, // OTP field
    createdAt: { type: Date, default: Date.now, expires: 300 }, // Expiration time in seconds (5 minutes)
});

module.exports = mongoose.model("Otp", otpSchema);