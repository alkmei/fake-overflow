// Tag Document Schema
import mongoose, { Schema } from "mongoose";
import Tag from "../../types/tag";

const tagSchema = new Schema<Tag>(
  {
    name: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const TagSchema = mongoose.model<Tag>("Tag", tagSchema);
export default TagSchema;
