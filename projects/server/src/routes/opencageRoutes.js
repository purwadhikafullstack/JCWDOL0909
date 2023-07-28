const express = require("express");
const { opencageController } = require("../controllers");

const router = express.Router();

router.get("/geolocation/:province/:city", opencageController.fetchGeolocation);

module.exports = router;
