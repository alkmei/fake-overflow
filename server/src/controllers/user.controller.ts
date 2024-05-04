import UserSchema from "../schema/user.schema";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { handleError } from "../utils";
import { AuthRequest } from "../../types/express";
import { isSelfOrStaff } from "../utils/auth";
import mongoose from "mongoose";
import AnswerSchema from "../schema/answer.schema";
import TagSchema from "../schema/tag.schema";
import QuestionSchema from "../schema/question.schema";

// GET /api/users/
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserSchema.find({}, { password: 0 });
    res.json(users);
  } catch (err: any) {
    handleError(err, res);
  }
};

// GET /api/users/:id
export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users/:id/questions
export const getQuestionsOfUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  try {
    const questions = await QuestionSchema.find({ author: id })
      .populate("comments")
      .sort({ creationTime: -1 });
    res.json(questions);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users/:id/questions-answered
export const getQAnsweredOfUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  try {
    const answers = await AnswerSchema.find({ author: id }).populate({
      path: "question",
      populate: {
        path: "author",
        select: "username",
      },
    });
    console.log(answers);
    const questions = answers.map((answer) => answer.question);

    res.json(questions);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/users/:id/tags
export const getTagsOfUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  try {
    const answers = await TagSchema.find({ author: id });
    res.json(answers);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/users
export const createUser = async (
  req: Request<{}, {}, { email: string; username: string; password: string }>,
  res: Response,
) => {
  const { email, username } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "A user with this email already exists!" });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const dbUser = await UserSchema.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    const { password, ...resUser } = dbUser.toObject();
    res.status(201).json(resUser);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/users/:id
export const updateUser = async (
  req: AuthRequest<
    { id: string },
    {},
    {
      email?: string;
      username?: string;
      password?: string;
      reputation?: number;
      isStaff?: boolean;
    }
  >,
  res: Response,
) => {
  const { email, username, password, reputation, isStaff } = req.body;
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id);
    if (!user) return res.status(400).json({ message: "User doesn't exist" });
    const isAllowed = await isSelfOrStaff(req, user.id);
    if (!isAllowed) return res.status(401).json({ message: "Forbidden" });

    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        email: email ?? user.email,
        username: username ?? user.username,
        password: password ? await bcrypt.hash(password, 10) : user.password,
        reputation: reputation ?? user.reputation,
        isStaff: isStaff ?? user.isStaff,
      },
      { projection: { password: 0 }, returnOriginal: false },
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/users/:id
export const deleteUser = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isAllowed = await isSelfOrStaff(req, user.id);
    if (!isAllowed) return res.status(401).json({ message: "Forbidden" });
    await UserSchema.findByIdAndDelete(id);
    res.status(204).json({ message: "User successfully deleted" });
  } catch (err) {
    handleError(err, res);
  }
};
