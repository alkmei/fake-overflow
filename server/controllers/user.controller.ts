import UserSchema from "../schema/user.schema";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { handleError } from "../utils";
import { AuthRequest } from "../types/express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserSchema.find({}, { password: 0 });
    res.json(users);
  } catch (err: any) {
    handleError(err, res);
  }
};

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

export const createUser = async (
  req: Request<{}, {}, { email: string; username: string; password: string }>,
  res: Response,
) => {
  const { email, username, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "A user with this email already exists!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({
      email: email,
      username,
      password: hashedPassword,
    });
    const dbUser = await newUser.save();
    res.status(201).json(dbUser);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (
  req: Request<
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
    const updatedUser = await UserSchema.findByIdAndUpdate(id, {
      email: email ?? user.email,
      username: username ?? user.username,
      password: password ? await bcrypt.hash(password, 10) : user.password,
      reputation: reputation ?? user.reputation,
      isStaff: isStaff ?? user.isStaff,
    });
  } catch (err) {
    handleError(err, res);
  }
};

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
    handleError(err, res);
  }
};
