import Question from "@server/types/question";
import User from "@server/types/user";
import Comment from "@server/types/comment";
import Tag from "@server/types/tag";

export const user: User = {
  username: "Miguel Angel Hernandez",
  email: "miguel@wolfie2d.atari2600",
  password: "sfa#&*g388237r87y@doifjsoifH#",
  id: 10,
  reputation: 10000,
  creationTime: new Date(),
};

export const tags: Tag[] = [
  { name: "wolfie", id: 1 },
  { name: "wolfie2dmaxx", id: 2 },
  { name: "help", id: 3 },
  { name: "what", id: 4 },
  { name: "who", id: 5 },
];

export const comments: Comment[] = [
  {
    author: user,
    text: "this is a comment",
    votes: 12,
    creationTime: new Date(),
  },
  {
    author: user,
    text: "this is a comment",
    votes: 0,
    creationTime: new Date(),
  },
  {
    author: user,
    text: "this is a comment",
    votes: 12,
    creationTime: new Date(),
  },
  {
    author: user,
    text: "this is a comment",
    votes: 12,
    creationTime: new Date(),
  },
  {
    author: user,
    text: "this is a comment hi",
    votes: 12,
    creationTime: new Date(),
  },
  {
    author: user,
    text: "this is a comment",
    votes: 12,
    creationTime: new Date(),
  },
  {
    author: user,
    text:
      "this is a long comment. this is a long comment. this is a long comment. this is a long comment. this is a" +
      " long comment. this is a long comment. this is a long comment. this is a long comment. this is a " +
      "long comment. this is a long comment. this is a long comment. this is a long comment. this is a long " +
      "comment. this is a long comment. this is a long comment. this is a long comment. this is a long comment." +
      " this is a long comment. this is a long comment. this is a long comment. hi man",
    votes: 0,
    creationTime: new Date(),
  },
];

export const tempQuestions: Question[] = [
  {
    title: "This is a Titisdfhuisdffhusdfhu 1",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    creationTime: new Date(),
    author: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 1,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question. hi  is a good question. hi this is a good question. ",
        author: user,
        creationTime: new Date(),
        votes: 2,
        comments: comments,
        id: 0,
      },
    ],
    tags: tags,
  },
  {
    title: "This is a Titisdfhuisdffhusdfhu 2",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    creationTime: new Date(),
    author: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 2,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. ",
        author: user,
        creationTime: new Date(),
        votes: 2,
        comments: comments,
      },
    ],
    tags: tags,
  },
  {
    title: "This is a Titisdfhuisdffhusdfhu 3",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    creationTime: new Date(),
    author: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 3,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. ",
        author: user,
        creationTime: new Date(),
        votes: 2,
        comments: comments,
      },
    ],
    tags: tags,
  },
  {
    title: "This is a Titisdfhuisdffhusdfhu 4",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    creationTime: new Date(),
    author: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 4,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. ",
        author: user,
        creationTime: new Date(),
        votes: 2,
        comments: comments,
      },
    ],
    tags: tags,
  },
  {
    title: "This is a Titisdfhuisdffhusdfhu 5",
    summary:
      "This is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summaryThis is a summary",
    creationTime: new Date(),
    author: user,
    text: "I have my influxdb working in server. When I try to open the influxdb UI using http://my_host:8086. I'm receiving 404 as response. What am I missing ? help me with this please.\n",
    views: 2,
    votes: 3,
    id: 5,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. hi this is a good question. ",
        author: user,
        creationTime: new Date(),
        votes: 2,
        comments: comments,
      },
    ],
    tags: tags,
  },
  {
    title: "This is a Title2 6",
    text: "this is my text2",
    summary: "This is a summary2",
    creationTime: new Date(),
    author: user,
    views: 0,
    votes: 3453,
    id: 6,
    comments: comments,
    answers: [
      {
        text: "hi this is a good question 1",
        author: user,
        comments: comments,
        votes: 0,
        creationTime: new Date(),
        id: 1,
      },
      {
        text: "hi this is a good question 2",
        author: user,
        comments: comments,
        votes: 0,
        creationTime: new Date(),
      },
      {
        text: "hi this is a good question 3",
        author: user,
        comments: comments,
        votes: 0,
        creationTime: new Date(),
      },
      {
        text: "hi this is a good question 4",
        author: user,
        comments: comments,
        votes: 0,
        creationTime: new Date(),
      },
      {
        text: "hi this is a good question 5",
        author: user,
        comments: comments,
        votes: 0,
        creationTime: new Date(),
      },
      {
        text: "hi this is a good question 6",
        author: user,
        comments: comments,
        votes: 100,
        creationTime: new Date(),
      },
    ],
    tags: tags,
  },
];
