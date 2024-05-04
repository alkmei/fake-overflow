import QuestionSchema from "../schema/question.schema";
import { Request, Response } from "express";
import { handleError, removeUndefinedKeys } from "../utils";
import { AuthRequest } from "../../types/express";
import { isAuthorOrStaff } from "../utils/auth";
import UserSchema from "../schema/user.schema";
import { addTagsToDB, findOrphanTags } from "../utils/tag";
import AnswerSchema from "../schema/answer.schema";
import TagSchema from "../schema/tag.schema";
import CommentSchema from "../schema/comment.schema";

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
    await QuestionSchema.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });
    const question = await QuestionSchema.findById(questionId)
      .populate("author", "username reputation creationTime")
      .populate("tags", "name")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate({
        path: "answers",
        populate: {
          path: "comments",
          model: "Comment",
          populate: {
            path: "author",
            model: "User",
          },
        },
      })
      .populate({
        path: "answers",
        populate: {
          path: "author",
          model: "User",
          select: "username reputation creationTime",
        },
      });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

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
    const authorId = req.userId!;
    const author = await UserSchema.findById(authorId);
    if (!author) return res.status(401).json({ message: "Invalid user" });

    const tagDocs = await addTagsToDB(author._id, tags);

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
      question.tags = await addTagsToDB(question.author._id, body.tags);
    }

    question.save();

    const tagsToDelete = await findOrphanTags();

    await TagSchema.deleteMany({
      _id: { $in: tagsToDelete.map((tag) => tag._id) },
    });

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

    // Delete all associated answers
    await AnswerSchema.deleteMany({ _id: { $in: deletedQuestion.answers } });

    await CommentSchema.deleteMany({ _id: { $in: deletedQuestion.comments } });

    const tagsToDelete = await findOrphanTags();

    await TagSchema.deleteMany({
      _id: { $in: tagsToDelete.map((tag) => tag._id) },
    });

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/questions/:id/answers
export const postAnswer = async (
  req: AuthRequest<{ id: string }, {}, { text: string }>,
  res: Response,
) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;
    const authorId = req.userId;
    const author = await UserSchema.findById(authorId);

    const answer = new AnswerSchema({ text: text, author: author!._id });
    const question = await QuestionSchema.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.answers.push(answer);
    const savedAnswer = await answer.save();
    await question.save();

    res.status(201).json(savedAnswer);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/questions/:id/comments
export const postCommentToQuestion = async (
  req: AuthRequest<{ id: string }, {}, { text: string }>,
  res: Response,
) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;
    const authorId = req.userId;
    const author = await UserSchema.findById(authorId);

    const comment = new CommentSchema({ text: text, author: author!._id });
    const question = await QuestionSchema.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.comments.push(comment);
    const savedComment = await comment.save();
    await question.save();

    res.status(201).json(savedComment);
  } catch (err) {
    handleError(err, res);
  }
};
