import Tag from "./tag";

export default interface Question {
  title: string;
  summary: string;
  askDateTime: Date;
  askedBy: string;
  views: number;
  votes: number;
  numAnswers: number;
  id: number;
  tags: Tag[];
}
