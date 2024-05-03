import { Document } from "mongoose";
import User from "./user";

export default interface Tag extends Document {
  name: string;
  author: User;
}
