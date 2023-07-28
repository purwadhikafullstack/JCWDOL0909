const express = require("express");
const { categoryController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, categoryController.addCategory);
router.get("/", categoryController.fetchAllCategories);

module.exports = router;
