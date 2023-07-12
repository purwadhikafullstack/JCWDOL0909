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
  "/fetchTransactions",
  verifyToken,
  transactionController.fetchTransactions
);
router.get(
  "/fetchTransactionStatus",
  transactionController.fetchTransactionStatus
);
router.post(
  "/createTransaction",
  verifyToken,
  transactionController.createTransaction
);
router.get(
  "/fetchTransactionShipping",
  transactionController.fetchTransactionShipping
);

module.exports = router;
