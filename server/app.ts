import express from "express";
import mongoose from "mongoose";
import userRoute from "./src/routes/user.route";
import sessionRoute from "./src/routes/session.route";
import questionRoute from "./src/routes/question.route";
import { Request } from "express";
import cors from "cors";

const app = express();

app.use(cors<Request>());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fake_so").catch((err) => {
  console.error(err);
  process.exit(1);
});

app.use("/api/users", userRoute);
app.use("/api/session", sessionRoute);
app.use("/api/questions", questionRoute);

export default app;
