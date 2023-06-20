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
};
