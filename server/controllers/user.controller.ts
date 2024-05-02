import UserSchema from "../schema/user.schema";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getAllUsers = (req: Request, res: Response) => {
  UserSchema.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const getUser = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  UserSchema.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const createUser = (
  req: Request<{}, {}, { email: string; username: string; password: string }>,
  res: Response,
) => {
  const { email, username, password } = req.body;
  UserSchema.findOne({ email }).then((user) => {
    if (user) {
      res.status(409).json({ message: "User already exists" });
    }
  });

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then((hashedPassword) => {
    const newUser = new UserSchema({
      email,
      username,
      password: hashedPassword,
    });
    newUser
      .save()
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
  });
};

export const updateUser = async (req: Request, res: Response) => {};

export const deleteUser = async (
  req: Request<{ email: string }>,
  res: Response,
) => {};
