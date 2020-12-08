const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addItemToCart = async (req, res) => {
  try {
    const { product, cartItems } = req.body;
    const cart = await Cart.find({ user: req.user._id });

    const foundProduct = await Product.findOne({ product });
    const existingItem = await Cart.findOne({ product });
    if (cart) {
      const item = await cart.cartItems.find(c.product == cartItems.product);
      if (item) {
        const modCart = await Cart.findOneAndUpdate(
          { user: req.user._id, 'cartItems.product': cartItems.product },
          {
            $set: {
              cartItems: {
                ...cartItems,
                quantity: item.quantity + cardItems.quantity,
              },
            },
          }
        );
      } else {
        const modCart = await Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: cartItems,
            },
          }
        );
      }

      
      return res.status(201).json({
        cart,
      });
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [cartItems],
      });
      cart.save((error, cart) => {
        if (error) {
          res.status(400).json({
            message: error.message,
          });
        }
        if (cart) {
          res.status(201).json({
            cart,
          });
        }
      });
    }
   
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
