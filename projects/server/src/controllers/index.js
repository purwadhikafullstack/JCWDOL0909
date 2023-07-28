const authController = require("./authController");
const productController = require("./productController");
const categoryController = require("./categoryController");
const userController = require("./userController");
const rajaOngkirController = require("./rajaOngkirController");
const opencageController = require("./openCage");
const addressController = require("./addressController");
const transactionController = require("./transactionController");
const paymentController = require("./paymentController");
const adminController = require("./adminController");
const stockController = require("./stockController");
const adminCategoryController = require("./adminCategoryController");
const adminProductController = require("./adminProductController");
const resetPasswordController = require("./resetPasswordController");

module.exports = {
  authController,
  productController,
  categoryController,
  userController,
  rajaOngkirController,
  opencageController,
  addressController,
  transactionController,
  paymentController,
  adminController,
  stockController,
  adminCategoryController,
  adminProductController,
  resetPasswordController,
};
