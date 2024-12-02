const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const salt = bcrypt.genSaltSync(10);
const secret = "abcdefghijk";

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    return res.json({ requestData: { username, password } });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passCheck = bcrypt.compareSync(password, userDoc.password);
    if (passCheck) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        return res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      return res.status(400).json("Bad Credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "").json({ Response: "OKK" });
};
