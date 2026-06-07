const SibApiV3Sdk = require("../config/bravo.config");

const sendResetEmail = async (email, resetToken) => {
  try {
    const tranEmailApi =
      new SibApiV3Sdk.TransactionalEmailsApi();

    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "swatigola274@gmail.com",
        name: "Room Rent App",
      },

      to: [
        {
          email,
        },
      ],

      subject: "Reset Your Password",

      htmlContent: `
        <h2>Password Reset</h2>

        <p>You requested a password reset.</p>

        <p>
          Click below link to reset password:
        </p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>
      `,
    });

    console.log("Reset email sent");
  } catch (error) {
      console.log("Error",error.message)
    console.log(
      "Email Error:",
      error.response?.body || error.message
    );

    throw error;
  }
};

module.exports = sendResetEmail;