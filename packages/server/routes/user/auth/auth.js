const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  getToken,
} = require("../../../controller/user/auth/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/token", getToken);

module.exports = router;
