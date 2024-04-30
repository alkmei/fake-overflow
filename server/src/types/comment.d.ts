import User from "./user";

export default interface Comment {
  commentBy: User;
  text: string;
  votes: number;
  commentDateTime: Date;
}
