const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const authController = require("./controllers/authController");
const postController = require("./controllers/postController");

const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

// Auth Routes
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/profile", authController.profile);
app.post("/logout", authController.logout);

// Blog Routes
app.post("/post", uploadMiddleware.single("file"), postController.createPost);
app.get("/post", postController.getPosts);
app.get("/post/:id", postController.getPostById);
app.get("/profile-post", postController.getUserPosts);
app.delete("/profile-post/:id", postController.deletePost);

// Comments Routes
app.post("/post/comment/:id", postController.createComment);
app.listen(8000, () => console.log("Server is running on port 8000"));
