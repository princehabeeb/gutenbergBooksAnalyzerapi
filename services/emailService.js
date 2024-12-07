const nodemailer = require("nodemailer");
const { emailTemplate } = require("../utils/emailTemplate");

exports.sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: emailTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
};
