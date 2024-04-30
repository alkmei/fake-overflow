// Answer Document Schema
import mongoose, { Schema } from "mongoose";
import Answer from "../types/answer";

const answers = new Schema(
  {
    text: { type: String, required: true },
    ansBy: { type: Schema.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.ObjectId, ref: "Answer" }],
    ansDateTime: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

answers.virtual("url").get(function () {
  return `posts/answer/${this._id}`;
});

module.exports = mongoose.model<Answer>("Answer", answers);
