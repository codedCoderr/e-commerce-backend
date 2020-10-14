const express = require("express");
const { register, login } = require("../controller/auth");
const {
  isRequestValidated,
  validateRegisterRequest,
  validateLoginRequest,
} = require("../validators/auth");
const router = express.Router();

router.post("/register", validateRegisterRequest, isRequestValidated, register);
router.post("/login", validateLoginRequest, isRequestValidated, login);

module.exports = router;
