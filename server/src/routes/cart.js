const express = require('express');
const { addItemToCart } = require('../controller/cart');
const { auth, userMiddleware } = require('../middleware');

const router = express.Router();

router.post('/user/cart/add-to-cart', auth, userMiddleware, addItemToCart);

module.exports = router;
