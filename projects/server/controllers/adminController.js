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
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  addProduct: async (req, res) => {
    try {
      const {
        productName,
        productPrice,
        productStock,
        productDesc,
        id_category,
      } = req.body;
      const idAdmin = req.user.id;
      const idBranch = req.user.id_branch;
      const admin = await query(
        `SELECT * FROM admins WHERE id_admin = ${db.escape(idAdmin)}`
      );
      if (admin.length <= 0) {
        return res.status(404).send("Admin not found");
      }
      const { file } = req;
      const filepath = file ? "/" + file.filename : null;
      let addProductQuery = `INSERT INTO products VALUES (null, ${db.escape(
        productName
      )}, ${db.escape(productPrice)}, ${db.escape(productStock)}, ${db.escape(
        filepath
      )}, ${db.escape(productDesc)}, ${db.escape(id_category)},${db.escape(
        idBranch
      )},null)`;
      let addProductResult = await query(addProductQuery);

      const productId = addProductResult.insertId;
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const adminName = admin[0].name;

      const stockHistoryQuery = `INSERT INTO stock_histories VALUES(null,${db.escape(
        currentDate
      )},${db.escape(adminName)}, "Initial Stock", "+", ${db.escape(
        productStock
      )}, ${db.escape(productStock)},${db.escape(productId)})`;

      let addHistoryResult = await query(stockHistoryQuery);

      return res.status(200).send({
        data: addProductResult,
        addHistoryResult,
        message: "Product created!",
        filepath,
        success: true,
      });
    } catch (error) {
      console.log("Error adding product:", error);
      return res.status(500).send("An error occurred while adding the product");
    }
  },
  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    const idAdmin = req.user.id;
    const admin = await query(
      `SELECT * FROM admins WHERE id_admin = ${db.escape(idAdmin)}`
    );
    if (admin.length <= 0) {
      return res.status(404).send("Admin not found");
    }
    let getCategoryQuery = `SELECT * FROM categories WHERE category_name = ${db.escape(
      categoryName
    )}`;
    let categoryExist = await query(getCategoryQuery);
    if (categoryExist.length > 0) {
      return res.status(400).send("Category is already exist!");
    }
    let addCategoryQuery = `INSERT INTO categories VALUES (null, ${db.escape(
      categoryName
    )})`;
    let addCategoryResult = await query(addCategoryQuery);
    return res
      .status(200)
      .send({ data: addCategoryResult, message: "Category Added!" });
  },

  fetchAllCategories: async (req, res) => {
    try {
      const category = await query(`SELECT * FROM categories`);
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  editCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const idCategory = req.params.id;
      const category = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      if (category.length <= 0) {
        return res.status(404).send("Category not found");
      }
      const getCategoryQuery = `SELECT * FROM categories WHERE category_name = ${db.escape(
        categoryName
      )}`;
      const categoryExist = await query(getCategoryQuery);
      if (categoryExist.length > 0) {
        return res.status(400).send("Category already exists!");
      }
      const updateCategoryQuery = `UPDATE categories SET
        category_name = ${db.escape(categoryName)}
        WHERE id_category = ${db.escape(idCategory)}`;
      await query(updateCategoryQuery);
      const updatedCategory = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      res.status(200).send("Category Updated Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message || "Internal Server Error");
    }
  },

  fetchCategoryById: async (req, res) => {
    try {
      const idCategory = req.params.id;
      const category = await query(
        `SELECT * FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;
      await query(
        `DELETE FROM categories WHERE id_category = ${db.escape(idCategory)}`
      );
      return res.status(200).send("Category Deleted Successfully.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchProductByBranchId: async (req, res) => {
    try {
      const idBranch = req.params.id;
      const category = await query(
        `SELECT * FROM products WHERE id_branch = ${db.escape(idBranch)}`
      );
      return res.status(200).send(category);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const idProduct = req.params.id;
      await query(
        `DELETE FROM products WHERE id_product = ${db.escape(idProduct)}`
      );
      return res.status(200).send("Product Deleted Successfully.");
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchProductById: async (req, res) => {
    try {
      const idProduct = req.query.idProduct;
      const product = await query(
        `SELECT products.*, categories.category_name
        FROM products
        INNER JOIN categories ON products.id_category = categories.id_category
        WHERE products.id_product = ${db.escape(idProduct)}`
      );

      if (product.length === 0) {
        return res.status(404).send("Product not found");
      }

      return res.status(200).send(product[0]);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      const {
        productName,
        productPrice,
        productStock,
        productDescription,
        id_category,
      } = req.body;
      const idProduct = req.params.id;

      const { file } = req;
      const filepath = file ? "/" + file.filename : null;
      const updateProductQuery = `
        UPDATE products SET
        name = COALESCE(${db.escape(productName)}, name),
        price = COALESCE(${db.escape(productPrice)}, price),
        stock = COALESCE(${db.escape(productStock)}, stock),
        image = COALESCE(${db.escape(filepath)}, image),
        description = COALESCE(${db.escape(productDescription)}, description),
        id_category = COALESCE(${db.escape(id_category)}, id_category)
        WHERE id_product = ${db.escape(idProduct)}
      `;
      const result = await query(updateProductQuery);

      if (result.affectedRows === 0) {
        return res.status(404).send("Product not found");
      }
      const currentDate = new Date().toISOString();
      const adminName = req.user.name;

      const stockHistoryQuery = `
        INSERT INTO stock_history VALUES(null, ${db.escape(
          currentDate
        )}, ${db.escape(adminName)}, "update stock", "+", ${db.escape(
        productStock
      )}, ${db.escape(productStock)}, ${db.escape(idProduct)})
      `;
      const addHistoryResult = await query(stockHistoryQuery);
      return res.status(200).send({
        data: result,
        message: "Product updated successfully!",
        updatedImage: filepath,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message || "Internal Server Error");
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
