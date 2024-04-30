import User from "./user";

export default interface Comment {
  text: string;
  votes: number;
  commentBy: User;
  commentDateTime: Date;
}
