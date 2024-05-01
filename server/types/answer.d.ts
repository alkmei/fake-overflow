import User from "./user";
import Comment from "./comment";

export default interface Answer {
  text: string;
  author: User;
  comments: Comment[];
  creationTime: Date;
}
