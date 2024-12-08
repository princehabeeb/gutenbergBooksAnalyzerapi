const crypto = require("crypto");

// Generate a secure OTP
exports.generateOTP = (length = 6) => {
  const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, "0");
  return otp;
};

// Validate OTP (e.g., match and check expiration)
exports.validateOTP = (inputOtp, userOtp, expiryTime) => {
  if (!inputOtp || !userOtp) return false;

  const isOtpMatch = inputOtp === userOtp;
  const isOtpExpired = Date.now() > expiryTime;

  return isOtpMatch && !isOtpExpired;
};
