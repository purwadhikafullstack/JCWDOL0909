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
router.get("/user", verifyToken, authController.fetchAllUser);
router.get("/user/:id", verifyToken, authController.fetchUser);
router.post("/changePassword", authController.changePassword);

module.exports = router;
