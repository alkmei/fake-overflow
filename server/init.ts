// Setup database with initial test data.
// Include an admin user.
// Script should take admin credentials as arguments as described in the requirements doc.
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import TagSchema from "./src/schema/tag.schema";
import UserSchema from "./src/schema/user.schema";
import AnswerSchema from "./src/schema/answer.schema";
import CommentSchema from "./src/schema/comment.schema";
import QuestionSchema from "./src/schema/question.schema";
import User from "./types/user";

const MONGO_URI = "mongodb://127.0.0.1:27017/fake_so";

const cliArgs = process.argv.slice(2);
const adminUsername = cliArgs[0];
const adminPassword = cliArgs[1];
if (!adminUsername || !adminPassword) {
  console.error("No admin username and/or password provided");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {}).catch((e) => {
  console.error(`Error: ${e}`);
  process.exit(1);
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:"),
);

function createTags(name: string, author: User) {
  const tag = new TagSchema({ name: name, author: author });
  return tag.save();
}

async function createUser(
  name: string,
  password: string,
  email: string,
  isStaff: boolean,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserSchema({
    username: name,
    password: hashedPassword,
    email: email,
    isStaff: isStaff,
  });
  return user.save();
}

function createAnswer(text: string, author: string, comments: string[] = []) {
  const answer = new AnswerSchema({
    text,
    author,
    comments,
  });
  return answer.save();
}

function createComment(text: string, author: string) {
  const comment = new CommentSchema({
    text,
    author,
  });
  return comment.save();
}

function createQuestion(
  title: string,
  text: string,
  summary: string,
  author: string,
  tags: string[],
) {
  const question = new QuestionSchema({
    title,
    text,
    summary,
    author,
    tags,
  });
  return question.save();
}

const populate = async () => {
  await createUser(adminUsername, adminPassword, adminUsername, true);
  const testUser = await createUser(
    "testuser",
    "testpassword",
    "testuser@test.com",
    false,
  );

  // Create some tags
  const tagNames = ["javascript", "python", "react", "node.js", "mongodb"];
  const tags = await Promise.all(
    tagNames.map((name) => createTags(name, testUser)),
  );

  // Create some questions
  await Promise.all([
    createQuestion(
      "What is the difference between let and var in JavaScript?",
      "I'm a bit confused about the differences between let and var in JavaScript. Can someone explain it to me?",
      "This question is about the differences between let and var in JavaScript for variable declaration and scoping.",
      testUser._id.toString(),
      [tags[0]._id.toString()],
    ),
    createQuestion(
      "How to handle asynchronous operations in JavaScript?",
      "I'm having trouble understanding how to handle asynchronous operations in JavaScript, like API calls or file operations. What are the best practices?",
      "This question is about handling asynchronous operations in JavaScript, such as promises, async/await, and callbacks.",
      testUser._id.toString(),
      [tags[0]._id.toString()],
    ),
    // Add more questions as needed
  ]);

  // Create some answers
  await Promise.all([
    createAnswer(
      "The main difference between let and var is the scope. `var` variables are function-scoped, while `let` variables are block-scoped.",
      testUser._id.toString(),
      [],
    ),
    createAnswer(
      "Asynchronous operations in JavaScript can be handled using callbacks, promises, or the async/await syntax. Promises and async/await are more modern and widely adopted approaches.",
      testUser._id.toString(),
      [],
    ),
    // Add more answers as needed
  ]);

  // Create some comments
  await Promise.all([
    createComment("Great explanation, thanks!", testUser._id.toString()),
    createComment(
      "I still don't fully understand promises, any additional resources?",
      testUser._id.toString(),
    ),
    // Add more comments as needed
  ]);

  console.log("Data populated successfully!");
};

populate().then(() => process.exit(0));
