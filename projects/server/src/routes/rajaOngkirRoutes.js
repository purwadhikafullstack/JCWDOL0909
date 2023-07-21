const express = require("express");
const { rajaOngkirController } = require("../controllers");

const router = express.Router();

router.get("/province", rajaOngkirController.getProvince);
router.get("/city", rajaOngkirController.getCity);
router.get("/district", rajaOngkirController.getDistrict);

module.exports = router;
