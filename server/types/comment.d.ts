import User from "./user";

export default interface Comment {
  text: string;
  votes: number;
  author: User;
  creationTime: Date;
}
