import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const verifyId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });
  next();
};
