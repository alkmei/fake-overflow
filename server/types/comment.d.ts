import User from "./user";
import { Document } from "mongoose";

export default interface Comment extends Document {
  text: string;
  votes: number;
  author: User;
  creationTime: Date;
}
