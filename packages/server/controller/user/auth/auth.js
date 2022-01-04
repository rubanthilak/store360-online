require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { getUserByEmail } = require("../../../models/User");
const redisClient = require("../../../localStorage/redis");
const {
  validateCreateRequest,
  getUserByEmail,
  createUser,
} = require("../../../models/User");

//signup controller
const signup = async (req, res) => {
  try {
    const { userName, email, password, repeat_password, phone } = req.body;
    const isError = validateCreateRequest(req.body).error;
    if (isError) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    
    if (await getUserByEmail(email)) {
      return res.status(400).json({ message: "User already exist" });
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
    res.status(400).json({ message: error || "SignUp Failed" });
  }
};

//login controller
const login = async (req, res) => {
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
  redis.set(refreshToken, JSON.stringify({
    userid: user.userid,
    email: user.email,
    phone: user.phone,
    userName: user.userName,
  }));

  res.cookie("access_token", token, {
    // secure: true,
    httpOnly: true,
  });
  res.cookie("refresh_token", refreshToken, {
    // secure: true,
    httpOnly: true,
  });
  res.status(200).json({ message: "Login Successful", response });
};

//getToken Controller
const getToken = async (req, res) => {
  try {
    let redis = await redisClient();
    const { refreshToken} = req.body;
    if ((!refreshToken))
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
    res.status(400).json({ message: error });
  }
};

module.exports = {
  login,
  signup,
  getToken,
};