const express = require("express");
const { productController } = require("../controllers");
const upload = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addProduct",
  verifyToken,
  upload.single("file"),
  productController.addProduct
);
router.get("/getProduct", productController.fetchAllProducts);
router.get("/:id", productController.fetchProductsByCategory);

module.exports = router;
