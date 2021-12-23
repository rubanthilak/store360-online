require("dotenv").config();
const signup = require("./routes/signup");
const login = require("./routes/login");
const express = require("express");
const {AUTH} = require("./middleware/auth")

const app = express();
const cors = require("cors");
const { connection } = require("./database/sql");

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL: " + connection.state);
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/login", AUTH, login);
app.use("/signup", signup);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


