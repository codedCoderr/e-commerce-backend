const Product = require('../models/product');
const slugify = require('slugify');
const shortId = require('shortId');

exports.createProduct = (req, res) => {
  const { name, price, description, category,quantity } = req.body;
  let productImages = [];
  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name, 
    slug: slugify(name),
    price,
    quantity,
    description,
    productImages,
    category,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(200).json({ product });
  });
};
