import Tag from "./tag";
import Answer from "./answer";

export default interface Question {
  title: string;
  text: string;
  summary: string;
  askDateTime: Date;
  askedBy: string;
  views: number;
  votes: number;
  id: number;
  answers: Answer[];
  tags: Tag[];
}
