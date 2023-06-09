const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// router.get("/", categoryController.fetchAllCategories);
router.post("/login", adminController.login);
router.post("/check-login", verifyToken, adminController.checkLoginAdmin);
router.get("/branch", adminController.fetchAllBranch);
router.post("/createAdmin", adminController.createAdminBranch);

module.exports = router;
