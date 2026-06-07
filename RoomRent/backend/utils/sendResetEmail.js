require("dotenv").config()
const transporter = require("../config/transporter")

const sendResetEmail = async (email, token) => {
  try {
        const resetLink =
      `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">
          Reset Password
        </a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    console.log("Reset email sent");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendResetEmail;