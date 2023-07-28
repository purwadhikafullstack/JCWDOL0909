const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");
const moment = require("moment");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;
      let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
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
      let mail = {
        from: `Admin <diywithicha@gmail.com>`,
        to: `${email}`,
        subject: `Verify your account`,
        html: `
        <div>
        <p>Thanks for registering! You need to activate your account,</p>
        <a href="https://jcwdol0909.purwadhikabootcamp.com/user/verifyEmail/${token}">Click Here</a>
        <span>to activate</span>
        </div>
        `,
      };
      let response = await nodemailer.sendMail(mail);
      return res.status(200).send({
        data: addUserResult,
        message: `Registration success! Please check your email to verify your account within 5 minutes `,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error", error });
    }
  },
  verification: async (req, res) => {
    try {
      const id = req.user.id;
      let checkStatusQuery = `SELECT is_verified FROM users WHERE id_user=${db.escape(
        id
      )}`;
      const result = await query(checkStatusQuery);
      if (result.length > 0 && result[0].is_verified) {
        return res.status(400).send({
          success: false,
          message: "link is invalid or expired!",
        });
      }
      let updateIsActiveQuery = `UPDATE users SET is_verified = true WHERE id_user=${db.escape(
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
        `SELECT * FROM users WHERE email=${db.escape(email)}`
      );
      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid", success: false });
      }
      const isValid = await bcrypt.compare(password, isEmailExist[0].password);
      if (!isValid) {
        return res
          .status(200)
          .send({ message: "Email or Password is incorrect", success: false });
      }
      let payload = {
        id: isEmailExist[0].id_user,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "4h" });
      const formattedBirthday = moment(isEmailExist[0].birthday).format(
        "YYYY-MM-DD"
      );
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].email,
          phoneNumber: isEmailExist[0].phone_number,
          isVerified: isEmailExist[0].is_verified,
          name: isEmailExist[0].fullname,
          gender: isEmailExist[0].gender,
          birthday: formattedBirthday,
          imagePath: isEmailExist[0].profile_picture,
          address: isEmailExist[0].id_address,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const idUser = req.user.id;
      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );
      if (user.length === 0) {
        return res.status(400).send("User does not exist");
      }
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        user[0].password
      );
      if (!isPasswordValid) {
        return res.status(200).send("Invalid password");
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )} WHERE id_user = ${db.escape(idUser)}`
      );

      return res.status(200).send("Password updated successfully");
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

      const formattedBirthday = moment(users[0].birthday).format("YYYY-MM-DD");

      return res.status(200).send({
        data: {
          id: users[0].id_user,
          name: users[0].fullname,
          isVerified: users[0].is_verified,
          email: users[0].email,
          phoneNumber: users[0].phone_number,
          gender: users[0].gender,
          birthday: formattedBirthday,
          imagePath: users[0].profile_picture,
          address: users[0].id_address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
