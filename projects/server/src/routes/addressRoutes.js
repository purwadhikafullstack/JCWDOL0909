const express = require("express");
const { addressController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/fetchAddress", verifyToken, addressController.fetchAddress);
router.get(
  "/fetchAddressById",
  verifyToken,
  addressController.fetchAddressById
);
router.get(
  "/fetchMainAddress",
  verifyToken,
  addressController.fetchMainAddress
);
router.post("/addAddress", verifyToken, addressController.addAddress);
router.patch("/setMainAddress", verifyToken, addressController.addMainAddress);
router.patch("/editAddress", addressController.editAddress);
router.delete("/deleteAddress", addressController.deleteAddress);

module.exports = router;
