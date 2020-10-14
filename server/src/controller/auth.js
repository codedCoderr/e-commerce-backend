const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "Duplicate user",
      });
    }
    const { firstName, lastName, email, password, username } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      username,
    });
    newUser.save();
    res.status(201).json({
      message: "New user created",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user.authenticate(password)) {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ _id: user._id, role: user.role }, secret, {
        expiresIn: "12h",
      });
      return res.status(200).json({
        token,
        user,
      });
    }
    res.status(400).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
