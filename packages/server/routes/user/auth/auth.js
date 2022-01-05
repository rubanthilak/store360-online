const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  getToken,
  forgotPassword,
  resetPassword,
} = require("../../../controller/user/auth/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/token", getToken);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:userid/:token",resetPassword);

module.exports = router;
