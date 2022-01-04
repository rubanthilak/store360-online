require("dotenv").config();
// const signup = require("./routes/user/signup");
// const login = require("./routes/user/login");
// const getToken = require("./routes/user/getToken")
const express = require("express");
const auth = require("./routes/user/auth/auth")

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
app.use("/user/auth/",auth)
// app.use("/login", login);
// app.use("/signup", signup);
// app.use("/token",getToken)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


