// Question Document Schema
import mongoose, { Schema } from "mongoose";
import Question from "../../types/question";

const questions = new Schema<Question>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    summary: { type: String, required: true },
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
    creationTime: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const QuestionSchema = mongoose.model<Question>("Question", questions);
export default QuestionSchema;
