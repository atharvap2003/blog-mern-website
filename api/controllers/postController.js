const fs = require("fs");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const secret = "abcdefghijk";

exports.createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(`.`);
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const coverPath = `${newPath.split(`/`).pop()}`;

      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: coverPath,
        author: info.id,
      });

      return res.json(postDoc);
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.json({ error: "Error while creating post" });
  }
};

exports.getPosts = async (req, res) => {
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
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
  } catch (error) {
    console.log(error);
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Token not Exist!" });
    }

    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const userId = decoded.id;
    const userPost = await Post.find({ author: userId });

    return res.json(userPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in Server" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    return res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.error("Error in Deletion of Post:", error);
    return res.status(500).json({ message: "Error in Server" });
  }
};


exports.createComment = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, "abcdefghijk"); // Use your secret key
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    const blogId = req.params.id;
    const blog = await Post.findById(blogId).populate("author", ["username"]);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found!" });
    }

    await Comment.create({
      content: req.body.content,
      blogId: blogId,
      createdBy: user._id,
    });

    return res.redirect(`/blog/${blogId}`);
  } catch (error) {
    console.error("Error in Comment Posting:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error in Comment Posting!" });
  }
};

exports.getComment = async (req, res) => {
  try {
     
  } catch (error) {
    console.error("Error in Comment Posting:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error in Comment Posting!" });
  }
};