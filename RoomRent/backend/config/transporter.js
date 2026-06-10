const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
console.log("EMAIL:", process.env.EMAIL);
console.log("APP_PASSWORD:", process.env.EMAIL_PASS);
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});
module.exports = transporter