import { Document } from "mongoose";

export default interface User extends Document {
  email: string;
  username: string;
  password: string;
  reputation: number;
  creationTime: Date;
}
