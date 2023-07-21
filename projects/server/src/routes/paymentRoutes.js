const express = require("express");
const { paymentController } = require("../controllers");
const upload = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addPayment",
  verifyToken,
  upload.single("file"),
  paymentController.addPayment
);

module.exports = router;
