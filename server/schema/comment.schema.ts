// Comment Document Schema
import mongoose, { Schema } from "mongoose";
import Comment from "../types/comment";

const comments = new Schema<Comment>(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    author: { type: Schema.ObjectId, ref: "User", required: true },
    creationTime: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

comments.virtual("url").get(function () {
  return `posts/comment/${this._id}`;
});

const CommentSchema = mongoose.model<Comment>("Comment", comments);
export default CommentSchema;
