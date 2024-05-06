import User from "./user";
import Comment from "./comment";
import { Document } from "mongoose";

export default interface Answer extends Document {
  text: string;
  votes: number;
  author: User;
  comments: Comment[];
  creationTime: Date;
}
