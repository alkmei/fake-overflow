import type { Response } from "express";

export const errorHandler = (err: unknown, res: Response) => {
  if (err instanceof Error) res.status(500).json({ message: err.message });
  else res.status(500).json({ message: "Something went wrong" });
};
