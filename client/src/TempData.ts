import Question from "@server/types/question";
import User from "@server/types/user";
import Comment from "@server/types/comment";

export const user: User = {
  username: "MIGUEL ANGEL HERNANDEZ CAMACHO",
  email: "miguel@wolfie2d.atari2600",
  password: "sfa#&*g388237r87y@doifjsoifH#",
  reputation: 10000,
};

export const comments: Comment[] = [
  {
    commentBy: user,
    text: "this is a comment",
    votes: 10,
    commentDateTime: new Date(),
  },
  {
    commentBy: user,
    text: "this is a comment 2",
    votes: 0,
    commentDateTime: new Date(),
  },
];

export const tempQuestions: Question[] = [
  {
    title:
      "This is a Titleasdfahujioasdhuisdhuisdfhuisdfhuhuisdhuisdhuisdhuisfhuisdfhuhuisdhuisdhuisdhuisdhuisdhuisdhuisdhuisdfhuisdfhuisdfhuisdfhusdfhu",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    askDateTime: new Date(),
    askedBy: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 1,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question",
        ansBy: user,
        ansDateTime: new Date(),
        comments: comments,
      },
    ],
    tags: [{ name: "wolfie", id: 1 }],
  },
  {
    title: "This is a Title2",
    text: "this is my text2",
    summary: "This is a summary2",
    askDateTime: new Date(),
    askedBy: user,
    views: 0,
    votes: 3453,
    id: 2,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question 2",
        ansBy: user,
        comments: comments,
        ansDateTime: new Date(),
      },
      {
        text: "hi this is a good question 1231231231231",
        ansBy: user,
        comments: comments,
        ansDateTime: new Date(),
      },
    ],
    tags: [{ name: "wolfie", id: 1 }],
  },
];
