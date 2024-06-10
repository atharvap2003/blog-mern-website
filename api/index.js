const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//models
const User = require("./models/user");

const app = express();
app.use(cookieParser());

//salt for hashing && secret for creating jwt;
const salt = bcrypt.genSaltSync(10);
const secret = "abcdefghijk";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://atharvapandharikar5:ZntxtwT6X39jXzf7@cluster0.wmmdh5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((e) => {
    console.log("Mongoose Error:", e);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ requestData: { username, password } });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passCheck = bcrypt.compareSync(password, userDoc.password);
  if (passCheck) {
    ///logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Bad Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({
    "Response" : "OKK"
  });
});

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000"); // Added a log statement for server start
});

// mongodb+srv://atharvapandharikar5:ZntxtwT6X39jXzf7@cluster0.wmmdh5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
