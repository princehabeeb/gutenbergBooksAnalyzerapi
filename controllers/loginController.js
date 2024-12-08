const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Normalize email for case insensitivity
    const normalizedEmail = email.toLowerCase();

    // Check if the email exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token with expiration
    const token = jwt.sign(
      { __dirnameid: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error); 
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    login,
};
