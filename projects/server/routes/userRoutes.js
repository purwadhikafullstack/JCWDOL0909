const express = require("express");
const { userController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.patch("/edit", verifyToken, userController.editProfile);
router.post(
  "/uploadProfilePicture",
  verifyToken,
  upload.single("file"),
  userController.uploadProfilePic
);

module.exports = router;
