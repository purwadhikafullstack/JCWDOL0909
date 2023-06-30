const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, query } = require("../database");

module.exports = {
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);

      const users = await query(
        `SELECT * FROM users WHERE id_admin = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isEmailExist = await query(
        `SELECT * FROM admins WHERE email=${db.escape(email)}`
      );
      console.log(isEmailExist);

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
        id: isEmailExist[0].id_admin,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "4h" });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_admin,
          id_role: isEmailExist[0].id_role,
          email: isEmailExist[0].email,
          name: isEmailExist[0].name,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  checkLoginAdmin: async (req, res) => {
    try {
      const admins = await query(
        `SELECT * FROM admins WHERE id_admin = ${db.escape(req.admin.id)}`
      );
      console.log(admins);
      return res.status(200).send({
        data: {
          id: admins[0].id_admin,
          email: admins[0].email,
          name: admins[0].name,
          id_role: admins[0].id_role,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
