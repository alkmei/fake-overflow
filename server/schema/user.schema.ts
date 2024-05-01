// User Document Schema
import mongoose, { Schema } from "mongoose";
import User from "../types/user";

const users = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    reputation: { type: Number, default: 50 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

users.virtual("url").get(function () {
  return `users/${this._id}`;
});

const UserSchema = mongoose.model<User>("User", users);
export default UserSchema;
