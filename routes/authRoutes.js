const express = require('express');
const { signup, verifyEmail, resendOtp } = require('../controllers/authController');
const {login} = require('../controllers/loginController');


const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

module.exports = router;
