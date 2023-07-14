const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  confirmEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(
        email
      )}`;
      let isEmailExist = await query(getEmailQuery);
      if (isEmailExist.length > 0) {
        payload = {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].email,
        };
        const token = jwt.sign(payload, "six6", { expiresIn: "4h" });
        let mail = {
          from: `Admin <eric.vianto.k7@gmail.com>`,
          to: `${email}`,
          subject: "Reset Password",
          html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Grocery</a>
                </div>
                <p>Thank you for using E-Grocery. Use the following Link to complete your Password Recovery Procedure. <br/>
                  Link is valid for 10 minutes</p>
                <a href="http://localhost:3000/user/resetPassword/${token}" style="background: #00466a;margin: 0 auto;width: max-content;padding: 10px;color: #fff;border-radius: 4px;">Reset Password</a>
                <p style="font-size:0.9em;">Regards,<br />Alexa</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>E-Grocery Admin</p>
                  <p>1600 Amphitheatre Parkway</p>
                  <p>California</p>
                </div>
              </div>
            </div>
          `,
        };
        try {
          await nodemailer.sendMail(mail);
          return res.status(200).json({
            success: true,
            message: "Link to reset your password has been sent to your email",
            token,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Failed to send email",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Email does not exist, please register",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
      }
      const userId = req.user.id;
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(newPassword, saltRounds);
      await query("UPDATE users SET password = ? WHERE id_user = ?", [
        hashPassword,
        userId,
      ]);
      return res.status(200).send("Password updated successfully");
    } catch (error) {
      console.log(error);
    }
  },
};
