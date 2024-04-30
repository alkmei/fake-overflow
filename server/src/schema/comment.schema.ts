// Comment Document Schema
import mongoose, { Schema } from "mongoose";
import Comment from "../types/comment";

const comments = new Schema(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    commentBy: { type: Schema.ObjectId, ref: "User", required: true },
    commentDateTime: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

comments.virtual("url").get(function () {
  return `posts/comment/${this._id}`;
});

module.exports = mongoose.model<Comment>("Comment", comments);
