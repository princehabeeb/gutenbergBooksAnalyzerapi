const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/emailSender');
const Joi = require('joi');
const crypto = require('crypto');

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ fullName, email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Check if the user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); 

    await Otp.create({ email, otp, expiresAt: otpExpiry });

    // Send OTP via email
    await sendEmail(email, 'Verify Your Email', `Your OTP for Gutenberg book analyzer is: ${otp}`);

    res.status(201).json({ message: 'Signup successful. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
  });

  const { error } = schema.validate({ email, otp });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark user as verified
    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteOne({ email, otp }); // Clean up used OTP

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate({ email });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Generate a new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update or create the OTP record
    await Otp.updateOne(
      { email },
      { email, otp, expiresAt: otpExpiry },
      { upsert: true }
    );

    // Send the OTP via email
    await sendEmail(email, 'Resend OTP - Verify Your Email', `Your new OTP is: ${otp}`);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = { signup, verifyEmail, resendOtp };
