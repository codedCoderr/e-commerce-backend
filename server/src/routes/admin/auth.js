const express = require("express");
const { register, login } = require("../../controller/admin/auth");
const {
  isRequestValidated,
  validateRegisterRequest,
  validateLoginRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post(
  "/admin/register",
  validateRegisterRequest,
  isRequestValidated,
  register
);
router.post("/admin/login", validateLoginRequest, isRequestValidated, login);

module.exports = router;
