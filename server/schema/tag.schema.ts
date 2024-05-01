// Tag Document Schema
import mongoose, { Schema } from "mongoose";
import Tag from "../types/tag";

const tagSchema = new Schema<Tag>(
  {
    name: { type: String, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

tagSchema.virtual("url").get(function () {
  return `posts/tag/${this._id}`;
});

const TagSchema = mongoose.model<Tag>("Tag", tagSchema);
export default TagSchema;
