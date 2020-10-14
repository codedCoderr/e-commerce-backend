const { check, validationResult } = require("express-validator");

exports.validateRegisterRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
];
exports.validateLoginRequest = [
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
];
exports.isRequestValidated = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
