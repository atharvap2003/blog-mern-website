const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
},{timestamps: true});

const CommentsModel = model("Comment", CommentSchema);
module.exports = CommentsModel;
