// Tag Document Schema
import mongoose, { Schema } from "mongoose";
import Tag from "../types/tag";

const tags = new Schema(
  {
    name: { type: String, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

tags.virtual("url").get(function () {
  return `posts/tag/${this._id}`;
});

module.exports = mongoose.model<Tag>("Tag", tags);
