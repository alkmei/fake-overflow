import { Request, Response } from "express";
import { handleError } from "../utils";
import AnswerSchema from "../schema/answer.schema";

// GET /api/answers
export const getAnswers = async (req: Request, res: Response) => {
  try {
    const answers = await AnswerSchema.find({}).populate("author");
    return res.status(200).json(answers);
  } catch (err) {
    handleError(err, res);
  }
};
