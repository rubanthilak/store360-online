const jwt = require("jsonwebtoken");
const redisClient = require("../../localStorage/redis");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let redis = await redisClient();
    const { refreshToken, email, name } = req.body;
    if ((!refreshToken, !email, !name))
      return res.status(400).json({ message: "Provide all detail" });
    let user = await redis.get(refreshToken);
    user = JSON.parse(user);
    console.log(user);
    if (user) {
        const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME,
      });
      res.cookie("access_token", token, {
        // secure: true,
        httpOnly: true,
      });
      return res.status(200).json({ message: "token send", token });
    }
    res.status(401).json({ message: "Please login again" });
  } catch (error) {
      console.log(error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
