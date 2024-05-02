import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fake_so").catch((err) => {
  console.error(err);
  process.exit(1);
});

app.use("/api/users", userRoute);

export default app;
