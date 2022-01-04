const express = require("express");
const router = express.Router();
const { validateCreateRequest, getUserByEmail, createUser } = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const { userName, email, password, repeat_password, phone } = req.body;
    const isError = validateCreateRequest(req.body).error;
    if (isError) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    console.log(await getUserByEmail(email));

    if(await getUserByEmail(email)){
      return res.status(400).json({ message: "User already exist" });
    }
   
    let user = await createUser({ userName, email, password, repeat_password, phone });

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error || "SignUp Failed" });
  }

});

module.exports = router;
