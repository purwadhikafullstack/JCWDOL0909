const { db, query } = require("../database");
const moment = require("moment");

const adminProductController = {
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
      if (admin.length === 0) {
        return res.status(404).send("Admin not found");
      }
      const getProductQuery = `SELECT * FROM products WHERE name = ${db.escape(
        productName
      )}`;
      const productExist = await query(getProductQuery);
      if (productExist.length > 0) {
        return res.status(400).send("Product is already exist!");
      }

      const { file } = req;
      const filepath = file ? "/" + file.filename : null;
      const addProductQuery = `INSERT INTO products VALUES (null, ${db.escape(
        productName
      )}, ${db.escape(productPrice)}, ${db.escape(productStock)}, ${db.escape(
        filepath
      )}, ${db.escape(productDesc)}, ${db.escape(id_category)},${db.escape(
        idBranch
      )},null)`;
      const addProductResult = await query(addProductQuery);

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
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const adminName = req.user.name;

      const stockHistoryQuery = `
        INSERT INTO stock_histories VALUES(null, ${db.escape(
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
};

module.exports = adminProductController;
