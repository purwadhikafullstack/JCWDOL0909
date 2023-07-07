const express = require("express");
const { transactionController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/fetchTransaction",
  verifyToken,
  transactionController.fetchTransaction
);
router.get(
  "/fetchTransactionStatus",
  transactionController.fetchTransactionStatus
);

module.exports = router;
