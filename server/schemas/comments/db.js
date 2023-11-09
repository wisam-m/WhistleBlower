import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: String,
  postId: String,
  content: String,
  isUpdated: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export const CommentModel = mongoose.model("CommentModel", commentSchema);
