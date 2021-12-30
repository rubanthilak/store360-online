const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { executeSqlQuery } = require("../database/sql");
const { response } = require("express");
const { User, validateCreateRequest } = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { userName, email, password, repeat_password, phone } = req.body;
    const isError = validateCreateRequest(req.body).error;

    if (isError) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    const user = new User({ userName, email, password, repeat_password, phone });
   
    if(await user.checkUserExist()){
      return res.status(409).json({ message: "User already exist" });
    }
   
    await user.createUser();

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "SignUp Failed" });
  }

});

module.exports = router;
