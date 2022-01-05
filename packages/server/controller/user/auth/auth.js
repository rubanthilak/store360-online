require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const redisClient = require("../../../localStorage/redis");
const {
  validateCreateRequest,
  getUserByEmail,
  createUser,
  updateUserOne,
} = require("../../../models/User");
const sendEmail = require("../../../utils/sendEmail");

//signup controller
const signup = async (req, res) => {
  try {
    const { userName, email, password, repeat_password, phone } = req.body;
    const isError = validateCreateRequest(req.body).error;
    if (isError) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    if (await getUserByEmail(email)) {
      return res.status(404).json({ message: "User already exist" });
    }

    let user = await createUser({
      userName,
      email,
      password,
      repeat_password,
      phone,
    });

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message || "SignUp Failed" });
  }
};

//login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Enter all Data" });

    let user = await getUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ message: "User Not Found, Please Check Email" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid Email or Password" });

    const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_PRIVATE_KEY, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    });
    const response = {
      status: "Logged in",
      accessToken: token,
      refreshToken: refreshToken,
    };

    let redis = await redisClient();
    redis.set(
      refreshToken,
      JSON.stringify({
        userid: user.userid,
        email: user.email,
        phone: user.phone,
        userName: user.userName,
      })
    );

    res.cookie("access_token", token, {
      // secure: true,
      httpOnly: true,
    });
    res.cookie("refresh_token", refreshToken, {
      // secure: true,
      httpOnly: true,
    });
    res.status(200).json({ message: "Login Successful", response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//getToken Controller
const getToken = async (req, res) => {
  try {
    let redis = await redisClient();
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Provide all detail" });
    let user = await redis.get(refreshToken);
    user = JSON.parse(user);
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
    res.status(400).json({ message: error.message });
  }
};

//forgot password controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await getUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ message: "User with given email doesn't exist" });

    const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME,
    });
    let redis = await redisClient();
    redis.set(
      token,
      JSON.stringify({
        userid: user.userid,
        email: user.email,
        phone: user.phone,
        userName: user.userName,
      })
    );

    const link = `${process.env.BASE_URL}/resetPassword/${token}`;
    await sendEmail(user.email, "Password reset", link);

    res
      .status(200)
      .json({ message: "password reset link sent to your email account" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//reset password controller
const resetPassword = async (req, res) => {
  try {
    let redis = await redisClient();
    const { token } = req.params;
    const schema = Joi.object({
      password: Joi.string().min(3).max(30).required(),
    });
    const { error } = schema.validate(req.body);
    console.log(token);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    let user = await redis.get(token);

    if (!user)
      return res.status(400).json({ message: "Invalid link or expired" });

    user = JSON.parse(user);
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);

    let check = await updateUserOne("password", password, user.email);

    if (!check)
      return res.status(500).json({ message: "Something went wrong" });

    await redis.del(token);
    res.status(200).json({ message: "password reset successfully." });
  } catch (error) {
    console.log(error.message);
    if (error.message == "jwt expired") {
      await redis.del(token);
      return res.status(401).json({ message: "Invalid link or expired" });
    }
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  signup,
  getToken,
  forgotPassword,
  resetPassword,
};
