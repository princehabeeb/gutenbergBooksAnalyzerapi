exports.emailTemplate = (otp) => `
  <h1>Email Verification</h1>
  <p>Your OTP is <b>${otp}</b></p>
  <p>This OTP is valid for 10 minutes.</p>
`;
