import QuestionSchema from "../schema/question.schema";
import { Request, Response } from "express";
import { handleError } from "../utils";
import { AuthRequest } from "../types/express";
import { isAuthorOrStaff } from "../utils/auth";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await QuestionSchema.find()
      .populate("author", "username")
      .populate("tags", "name");
    res.json(questions);
  } catch (err) {
    handleError(err, res);
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionSchema.findById(questionId)
      .populate("author", "username")
      .populate("tags", "name")
      .populate("comments")
      .populate("answers");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.views++;
    await question.save();

    res.json(question);
  } catch (err) {
    handleError(err, res);
  }
};

export const createQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { title, text, summary, tags } = req.body;
    const authorId = req.userId;

    const newQuestion = new QuestionSchema({
      title,
      text,
      summary,
      author: authorId,
      tags,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const questionId = req.params.id;
    const { title, text, summary, tags } = req.body;

    const isAllowed = await isAuthorOrStaff(req, questionId);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedQuestion = await QuestionSchema.findByIdAndUpdate(
      questionId,
      { title, text, summary, tags },
      { new: true },
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (err) {
    handleError(err, res);
  }
};
