const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eric.vianto.k7@gmail.com",
    pass: "ovvgtfsmihgjfnqw",
  },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;
