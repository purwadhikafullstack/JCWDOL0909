const express = require("express");
const { authController, resetPasswordController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/check-login", verifyToken, authController.checkLogin);
router.post("/verification", verifyToken, authController.verification);
router.post("/changePassword", verifyToken, authController.changePassword);
router.post("/confirmEmail", resetPasswordController.confirmEmail);
router.post(
  "/resetPassword",
  verifyToken,
  resetPasswordController.resetPassword
);

module.exports = router;
