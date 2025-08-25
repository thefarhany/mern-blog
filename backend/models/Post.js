const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide a Title for The Post."],
      trim: true,
      maxlength: [100, "Title Cannot be More Than 100 Characters."],
    },
    content: {
      type: String,
      required: [true, "Please provide content for the post."],
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
