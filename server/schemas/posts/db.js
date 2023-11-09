import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  author: String,
  tags: [String],
  files: String,
  numLikes: {
    type: Number,
    default: 0,
  },
  numDislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export const PostModel = mongoose.model("PostModel", postSchema);
