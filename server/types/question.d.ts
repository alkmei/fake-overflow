import Tag from "./tag";
import Answer from "./answer";
import User from "./user";
import Comment from "./comment";

export default interface Question {
  title: string;
  text: string;
  summary: string;
  views: number;
  votes: number;
  id: number;
  creationTime: Date;
  author: User;
  comments: Comment[];
  answers: Answer[];
  tags: Tag[];
}
