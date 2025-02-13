const Usermodel = require("../models/usermodel");
const otpmodel = require("../models/otpmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const transporter = require("../middleware/emailtransporterr");

//signup controller
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new Usermodel({ 
            name, 
            email, 
            password: hash 
        });
        //save new user
        await newUser.save();
        //return success response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        //log error
        console.log(error);
        //return error response
        res.status(500).json({ message: "Something went wrong" });
    }
}


//login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


//generate otp
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

//send otp to email using email transporter
exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const otp = generateOTP();
        const newotp = await otpmodel.create({ email, otp });

        // Send email using transporter
        await transporter.sendMail({
            from: "pkhassanraza9@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${newotp.otp}. It is valid for 5 minutes.`,
        });
        res.status(200).json({ message: "OTP sent successfully", email, otp: newotp.otp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

//verify otp
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await otpmodel.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        await otpmodel.deleteOne({ email });
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


//reset password
exports.resetpassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



//get user by passing barear token
exports.getuser = async (req, res) => {
    try {
        const user = await Usermodel.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//update user
exports.updateuser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Usermodel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (email) {
            user.email = email;
        }
        if (name) {
            user.name = name;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            user.password = hash;
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
