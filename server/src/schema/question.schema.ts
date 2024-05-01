// Question Document Schema
import mongoose, { Schema } from "mongoose";
import Question from "../types/question";

const questions = new Schema<Question>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    summary: { type: String, required: true },
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
    askDateTime: { type: Date, default: Date.now },
    askedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

questions.virtual("url").get(function () {
  return `posts/question/${this._id}`;
});

module.exports = mongoose.model<Question>("Question", questions);
