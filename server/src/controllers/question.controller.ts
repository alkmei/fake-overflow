import QuestionSchema from "../schema/question.schema";
import { Request, Response } from "express";
import { handleError, removeUndefinedKeys } from "../utils";
import { AuthRequest } from "../../types/express";
import { isAuthorOrStaff } from "../utils/auth";
import Tag from "../../types/tag";
import TagSchema from "../schema/tag.schema";
import UserSchema from "../schema/user.schema";
import mongoose from "mongoose";
import { addTagsToDB } from "../utils/tag";

// GET /api/questions
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

// GET /api/questions/:id
export const getQuestionById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const questionId = req.params.id;
    const question = await QuestionSchema.findById(questionId)
      .populate("author", "username reputation creationTime")
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

// POST /api/questions
export const createQuestion = async (
  req: AuthRequest<
    {},
    {},
    { title: string; text: string; summary: string; tags: string[] }
  >,
  res: Response,
) => {
  try {
    const { title, text, summary, tags } = req.body;
    const authorId = req.userId;
    const author = await UserSchema.findById(authorId);
    if (!author) return res.status(404).json({ message: "Author not found" });

    const tagDocs = addTagsToDB(author, tags);

    const newQuestion = new QuestionSchema({
      title: title,
      text: text,
      summary: summary,
      author: author,
      tags: tagDocs,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/questions/:id
export const updateQuestion = async (
  req: AuthRequest<
    { id: string },
    {},
    { title?: string; text?: string; summary?: string; tags?: string[] }
  >,
  res: Response,
) => {
  try {
    const questionId = req.params.id;
    const body = removeUndefinedKeys(req.body);

    const isAllowed = await isAuthorOrStaff(req, questionId, QuestionSchema);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const question = await QuestionSchema.findById(questionId);

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    if (body.tags) {
      question.tags = await addTagsToDB(question.author, body.tags);
    }

    question.save();
    res.json(question);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/questions/:id
export const deleteQuestion = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  try {
    const questionId = req.params.id;

    const isAllowed = await isAuthorOrStaff(req, questionId, QuestionSchema);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedQuestion = await QuestionSchema.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};
