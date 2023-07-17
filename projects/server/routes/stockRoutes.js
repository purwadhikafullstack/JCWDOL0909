const express = require("express");
const { stockController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/fetchStockHistories",
  verifyToken,
  stockController.fetchStockHistories
);

module.exports = router;
