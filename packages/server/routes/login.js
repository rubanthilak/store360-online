require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../models/User");
const redisClient = require("../localStorage/redis");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Enter all Data" });

  let user = await getUserByEmail(email);
  if (!user)
    return res
      .status(404)
      .json({ message: "User Not Found, Please Check Email" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({message:"Invalid Email or Password"});
  console.log(typeof user,user);
  const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(user,
    process.env.JWT_REFRESH_PRIVATE_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    }
  );
  console.log(token, refreshToken);
  const response = {
    status: "Logged in",
    accessToken: token,
    refreshToken: refreshToken,
  };
  let redis = await redisClient();
  redis.set(refreshToken, refreshToken);
  res.cookie("access_token", token, {
    // secure: true,
    httpOnly: true,
  });
  res.cookie("refresh_token", refreshToken, {
    // secure: true,
    httpOnly: true,
  });
  res.status(200).json({message: "Login Successful"});
});

module.exports = router;
