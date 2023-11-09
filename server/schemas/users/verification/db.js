import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
  username: String,
  tag: String,
  similarity: String,
  createdAt: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
});

export const TagsModel = mongoose.model("tagsmodel", tagsSchema);
