const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
//models
const User = require("./models/user");
const Post = require("./models/post");
const { log } = require("console");

const app = express();
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
    return res.json({ requestData: { username, password } });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
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
      return res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    return res.status(400).json("Bad Credentials");
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
    Response: "OKK",
  });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(`.`);
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  console.log(path);
  console.log(originalname);
  console.log(parts);
  console.log(ext);
  console.log(newPath);
  console.log(originalname);
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: path,
        author: info.id,
      });

      return res.json(postDoc);
    });
  } catch (error) {
    return res.json({ error: "error" });
  }
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10);
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile-post", async (req, res) => {
  try {
    const { token } = req.cookies; // Access the specific token key
    console.log("Cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "Token not Exist!" });
    }

    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    console.log(decoded);
    const userId = decoded.id;
    const userPost = await Post.find({ author: userId });
    console.log(userPost);
    return res.json(userPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in Server" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000"); // Added a log statement for server start
});
