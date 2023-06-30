const express = require("express");
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/:id", verifyToken, userController.fetchUser);
// router.get("/", userController.fetchProduct);
router.patch("/edit", verifyToken, userController.editProfile);

module.exports = router;
