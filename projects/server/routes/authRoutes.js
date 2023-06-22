const express = require("express");
const { authController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/check-login", verifyToken, authController.checkLogin);
router.get("/user", authController.fetchAllUser);
router.get("/user/:id", authController.fetchUser);
router.post("/verification", verifyToken, authController.verification);
router.post("/changePassword", verifyToken, authController.changePassword);
router.post("/confirmEmail", authController.confirmEmail);
router.post("/resetPassword", verifyToken, authController.resetPassword);

module.exports = router;
