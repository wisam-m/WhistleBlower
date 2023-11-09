import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: String,
  hash: String,
  createdAt: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
});

export const UsersModel = mongoose.model("usermodels", userSchema);
