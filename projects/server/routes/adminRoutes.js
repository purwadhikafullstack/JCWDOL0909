const express = require("express");
const {
  adminController,
  adminCategoryController,
  adminProductController,
} = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);

// Product Route
router.get("/getProduct/:id", adminProductController.fetchProductByBranchId);
router.post(
  "/addProduct",
  verifyToken,
  upload.single("file"),
  adminProductController.addProduct
);
router.get("/product/:id", adminProductController.fetchProductById);
router.patch(
  "/editProduct/:id",
  verifyToken,
  upload.single("file"),
  adminProductController.editProduct
);
router.delete("/deleteProduct/:id", adminProductController.deleteProduct);

// Category Route
router.get("/getCategory", adminCategoryController.fetchAllCategories);
router.post("/addCategory", verifyToken, adminCategoryController.addCategory);
router.delete("/deleteCategory/:id", adminCategoryController.deleteCategory);
router.patch(
  "/editCategory/:id",
  verifyToken,
  adminCategoryController.editCategory
);
router.get("/getCategory/:id", adminCategoryController.fetchCategoryById);

router.get(
  "/fetchTransactionByBranch",
  verifyToken,
  adminController.fetchTransactionByBranch
);
router.patch("/cancelTransaction/:id", adminController.cancelTransaction);
router.patch("/sendTransaction/:id", adminController.sendTransaction);

module.exports = router;
