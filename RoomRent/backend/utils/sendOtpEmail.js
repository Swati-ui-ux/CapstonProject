const nodemailer = require("nodemailer");

const transporter = require("../config/transporter")

const sendOtpEmail = async (
  email,
  otp
) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Login OTP",

    html: `
      <h2>OTP Verification</h2>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>
        OTP valid for 5 minutes
      </p>
    `,
  });

};

module.exports = sendOtpEmail;