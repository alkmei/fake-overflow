import UserSchema from "../schema/user.schema";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { errorHandler } from "../util";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserSchema.find({}, { password: 0 });
    res.json(users);
  } catch (err: any) {
    errorHandler(err, res);
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const createUser = async (
  req: Request<{}, {}, { email: string; username: string; password: string }>,
  res: Response,
) => {
  const { email, username, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({
      email: email,
      username,
      password: hashedPassword,
    });
    const dbUser = await newUser.save();
    res.status(201).json(dbUser);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).json({ message: "User successfully deleted" });
  } catch (err) {
    errorHandler(err, res);
  }
};
