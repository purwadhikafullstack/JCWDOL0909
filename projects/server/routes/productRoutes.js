const express = require("express");
const { productController } = require("../controllers");
const upload = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addproduct",
  verifyToken,
  upload.single("file"),
  productController.addProduct
);
router.get("/", productController.fetchAllProducts);
router.get("/:id", productController.fetchProduct);
router.get("/category", productController.fetchProductsByCategory);
router.get("/product", productController.fetchAllProducts);
router.get("/product/:id", productController.fetchProductsByCategory);

module.exports = router;
