const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;

      let getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
        email
      )}`;
      let isEmailExist = await query(getEmailQuery);
      if (isEmailExist.length > 0) {
        return res.status(200).send({ message: "Email has been used" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
        email
      )}, ${db.escape(hashPassword)}, ${db.escape(
        phoneNumber
      )}, false, null, null, null, null, null)`;
      let addUserResult = await query(addUserQuery);

      let payload = { id: addUserResult.insertId };
      const token = jwt.sign(payload, "six6", { expiresIn: "5m" });
      console.log(token);

      let mail = {
        from: `Admin <diywithicha@gmail.com>`,
        to: `${email}`,
        subject: `Verify your account`,
        html: `
        <div>
        <p>Thanks for registering! You need to activate your account,</p>
        <a href="http://localhost:3000/user/verifyEmail/${token}">Click Here</a>
        <span>to activate</span>
        </div>
        `,
      };
      let response = await nodemailer.sendMail(mail);
      console.log(response);

      return res.status(200).send({
        data: addUserResult,
        message: `Registration success! Please check your email to verify your account within 5 minutes `,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error", error });
    }
  },
  verification: async (req, res) => {
    try {
      const id = req.user.id;
      // Tambahkan query untuk memeriksa status akun sebelum memperbarui
      let checkStatusQuery = `SELECT isVerified FROM users WHERE id_user=${db.escape(
        id
      )}`;
      console.log(checkStatusQuery);

      const result = await query(checkStatusQuery);

      // Periksa apakah akun sudah aktif sebelumnya
      if (result.length > 0 && result[0].isVerified) {
        return res.status(400).send({
          success: false,
          message: "link is invalid or expired!",
        });
      }

      let updateIsActiveQuery = `UPDATE users SET isVerified = true WHERE id_user=${db.escape(
        id
      )}`;
      await query(updateIsActiveQuery);
      res.status(200).send({ success: true, message: "Account is verified" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isEmailExist = await query(
        `SELECT * FROM users WHERE user_email=${db.escape(email)}`
      );
      console.log(isEmailExist);

      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid", success: false });
      }
      const isValid = await bcrypt.compare(
        password,
        isEmailExist[0].user_password
      );
      if (!isValid) {
        return res
          .status(200)
          .send({ message: "Email or Password is incorrect", success: false });
      }
      let payload = {
        id: isEmailExist[0].id_user,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "2h" });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].user_email,
          phone: isEmailExist[0].user_phone_number,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, newPassword, confirmPassword } = req.body;

      // Verifikasi email pengguna
      const user = await query(
        `SELECT * FROM users WHERE user_email = ${db.escape(email)}`
      );

      if (user.length === 0) {
        return res.status(400).send("User does not exist");
      }

      // Validasi input password baru dan konfirmasi password
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
      }

      // Hash password baru
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      // Update password di database
      await query(
        `UPDATE users SET user_password = ${db.escape(
          hashPassword
        )} WHERE user_email = ${db.escape(email)}`
      );

      return res.status(200).send("Password updated successfully");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchAllUser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);

      const users = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(req.user.id)}`
      );
      console.log(users);
      return res.status(200).send({
        data: {
          id: users[0].id_user,
          email: users[0].user_email,
          phone: users[0].user_phone_number,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  confirmEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
        email
      )}`;
      // console.log(getEmailQuery);
      let isEmailExist = await query(getEmailQuery);
      console.log(isEmailExist);

      if (isEmailExist.length > 0) {
        payload = {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].user_email,
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
        console.log(token);
        try {
          await nodemailer.sendMail(mail);
          return res.status(200).json({
            success: true,
            message: "Link to reset your password has been sent to your email",
            token,
          });
        } catch (error) {
          console.error(error);
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
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;

      // Validasi input password baru dan konfirmasi password
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
      }

      // Dapatkan userId dari req
      const userId = req.user.id;
      console.log(userId);

      // Hash password baru
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password di database
      await query("UPDATE users SET user_password = ? WHERE id_user = ?", [
        hashPassword,
        userId,
      ]);

      return res.status(200).send("Password updated successfully");
    } catch (error) {
      console.log(error);
    }
  },
};
