import User from "./user";
import Comment from "./comment";

export default interface Answer {
  text: string;
  ansBy: User;
  comments: Comment[];
  ansDateTime: Date;
}
