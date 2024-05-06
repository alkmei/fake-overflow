import Tag from "./tag";
import Answer from "./answer";
import User from "./user";
import Comment from "./comment";
import { Document } from "mongoose";

export default interface Question extends Document {
  title: string;
  text: string;
  summary: string;
  views: number;
  votes: number;
  creationTime: Date;
  author: User;
  comments: Comment[];
  answers: Answer[];
  tags: Tag[];
}
