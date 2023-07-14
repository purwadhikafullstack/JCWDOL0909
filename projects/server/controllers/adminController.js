const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, query } = require("../database");
const nodemailer = require("../helpers/nodemailer");
const moment = require("moment");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isEmailExist = await query(
        `SELECT * FROM admins WHERE email=${db.escape(email)}`
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
        id: isEmailExist[0].id_admin,
        id_branch: isEmailExist[0].id_branch,
        name: isEmailExist[0].name,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "4h" });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_admin,
          id_role: isEmailExist[0].id_role,
          id_branch: isEmailExist[0].id_branch,
          email: isEmailExist[0].email,
          name: isEmailExist[0].name,
          id_branch: isEmailExist[0].id_branch,
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
        `SELECT * FROM admins WHERE id_admin = ${db.escape(req.user.id)}`
      );
      return res.status(200).send({
        data: {
          id: admins[0].id_admin,
          email: admins[0].email,
          name: admins[0].name,
          id_role: admins[0].id_role,
          id_branch: admins[0].id_branch,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchAllBranch: async (req, res) => {
    try {
      const branch = await query(`SELECT * FROM branches`);
      return res.status(200).send(branch);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  createAdminBranch: async (req, res) => {
    try {
      const { adminEmail, adminName, id_branches } = req.body;
      let getEmailQuery = `SELECT * FROM admins WHERE email=${db.escape(
        adminEmail
      )}`;
      let isEmailExist = await query(getEmailQuery);
      if (isEmailExist.length > 0) {
        return res.status(200).send({ message: "Email has been used" });
      }
      const randomstring = Math.random().toString(36).slice(-10);
      const hashPass = await bcrypt.hash(randomstring, 10);
      let createAdminBranchQuery = `INSERT INTO admins VALUES (null, ${db.escape(
        adminName
      )}, ${db.escape(adminEmail)}, ${db.escape(hashPass)}, 2, ${db.escape(
        id_branches
      )})`;
      let createAdminResult = await query(createAdminBranchQuery);
      let payload = { id: createAdminResult.insertId };
      const token = jwt.sign(payload, "six6", { expiresIn: "5m" });
      let mail = {
        from: `Admin <diywithicha@gmail.com>`,
        to: `${adminEmail}`,
        subject: `branch Admin created!`,
        html: `hi <b>${adminName}</b>, <br />Your auto-generated password is: ${randomstring}. Use it to login to the e-grocery app.`,
      };
      nodemailer.sendMail(mail);
      return res.status(200).send({
        data: createAdminResult,
        message: "Admin created!",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  fetchTransactionByBranch: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const { startDate, endDate } = req.query;
      const admin = await query(
        `SELECT * FROM admins WHERE id_admin = ${db.escape(idAdmin)}`
      );

      let queryStr = `
        SELECT *
        FROM transactions
        INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
        INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
        INNER JOIN products ON transaction_products.id_product = products.id_product
        INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
        WHERE products.id_branch = ${db.escape(admin[0].id_branch)};     
      `;
      // Check if startDate and endDate are provided
      if (startDate && endDate) {
        queryStr += ` AND transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      const transaction = await query(queryStr);

      res.status(200).send(transaction);
    } catch (error) {
      res.status(error.status || 500).send(error);
      console.log(error);
    }
  },

  cancelTransaction: async (req, res) => {
    try {
      const idTransaction = parseInt(req.params.id);
      await query(
        `UPDATE transactions
        SET id_transaction_status = 6
        WHERE id_transaction = ${db.escape(idTransaction)};`
      );
      return res.status(200).send("Transaction has been canceled.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  sendTransaction: async (req, res) => {
    try {
      const idTransaction = parseInt(req.params.id);
      await query(
        `UPDATE transactions
        SET id_transaction_status = 4
        WHERE id_transaction = ${db.escape(idTransaction)};`
      );
      return res.status(200).send("Order will be sent to the user.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
