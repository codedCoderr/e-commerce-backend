const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({
      message: "Authorization required",
    });
  }
  next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  
};

exports.userMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "user") {
    return res.status(400).json({
      message: "User Access denied",
    });
  }
  next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  
};
exports.adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "Admin Access denied",
    });
  }
  next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  
};
