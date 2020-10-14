const express = require("express");
const { addCategory, getCategories } = require("../controller/category");
const { adminMiddleware, auth } = require("../middleware");

const router = express.Router();

router.post("/category/create", auth, adminMiddleware, addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;
