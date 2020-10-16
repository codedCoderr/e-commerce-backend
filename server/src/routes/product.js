const express = require('express');
const { createProduct } = require('../controller/product');
const { adminMiddleware, auth } = require('../middleware');
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + '-' + file.originalname);
  },
});
const upload = multer({
  storage,
});
router.post(
  '/product/create',
  auth,
  adminMiddleware,
  upload.array('productImage'),
  createProduct
);
// router.get('/category/getcategories', getCategories);

module.exports = router;
