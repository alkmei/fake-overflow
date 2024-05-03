import QuestionSchema from "../schema/question.schema";
import { Request, Response } from "express";
import { handleError, removeUndefinedKeys } from "../utils";
import { AuthRequest } from "../../types/express";
import { isAuthorOrStaff } from "../utils/auth";
import Tag from "../../types/tag";
import TagSchema from "../schema/tag.schema";

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

    const tagObj = tags.map((t) => new TagSchema({ name: t }));

    const newQuestion = new QuestionSchema({
      title: title,
      text: text,
      summary: summary,
      author: authorId,
      tags: tagObj,
    });

    for (const tag of tagObj) {
      await tag.save();
    }
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      console.error("There was a duplicate key error");
    }
    handleError(err, res);
  }
};

export const updateQuestion = async (
  req: AuthRequest<
    { id: string },
    {},
    { title?: string; text?: string; summary?: string; tags?: Tag[] }
  >,
  res: Response,
) => {
  try {
    const questionId = req.params.id;
    const body = req.body;

    const isAllowed = await isAuthorOrStaff(req, questionId);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedQuestion = await QuestionSchema.findByIdAndUpdate(
      questionId,
      removeUndefinedKeys(body),
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

export const deleteQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const questionId = req.params.id;

    const isAllowed = await isAuthorOrStaff(req, questionId);

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
