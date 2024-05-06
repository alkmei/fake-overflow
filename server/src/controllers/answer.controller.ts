import { Request, Response } from "express";
import { handleError } from "../utils";
import AnswerSchema from "../schema/answer.schema";
import { AuthRequest } from "../../types/express";
import { isAuthorOrStaff } from "../utils/auth";
import CommentSchema from "../schema/comment.schema";
import UserSchema from "../schema/user.schema";
import QuestionSchema from "../schema/question.schema";

// GET /api/answers
export const getAnswers = async (_req: Request, res: Response) => {
  try {
    const answers = await AnswerSchema.find({}).populate("author");
    return res.status(200).json(answers);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/answers/:id
export const getAnswerById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const answerId = req.params.id;
    const answer = await AnswerSchema.findById(answerId)
      .populate("author")
      .populate("comments");

    if (!answer) return res.status(404).json({ message: "Answer not found" });

    return res.status(200).json(answer);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/answers/:id
export const deleteAnswer = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  try {
    const answer = await AnswerSchema.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "No such answer" });
    if (!(await isAuthorOrStaff(req, answer._id, AnswerSchema)))
      return res.status(403).json({ message: "Forbidden" });

    const question = await QuestionSchema.findOne({ answers: answer._id });
    if (!question)
      return res
        .status(404)
        .json({ message: "Answer not associated with any question" });

    question.answers = question.answers.filter(
      (answerId) => answerId.toString() !== answer._id.toString(),
    );
    await question.save();

    const deletedAnswer = await AnswerSchema.findByIdAndDelete(req.params.id);
    await CommentSchema.deleteMany({ _id: { $in: deletedAnswer!.comments } });

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/answers/:id/comments
export const postCommentToAnswer = async (
  req: AuthRequest<{ id: string }, unknown, { text: string }>,
  res: Response,
) => {
  try {
    const answerId = req.params.id;
    const { text } = req.body;
    const authorId = req.userId;
    const author = await UserSchema.findById(authorId);

    const comment = new CommentSchema({ text: text, author: author!._id });
    const answer = await AnswerSchema.findById(answerId);
    if (!answer) return res.status(404).json({ error: "Answer not found" });
    if (author && author.reputation < 50 && !author.isStaff)
      return res.status(400).json({ message: "Not enough reputation" });
    answer.comments.push(comment);
    const savedComment = await comment.save();
    await answer.save();
    const populatedComment = await savedComment.populate("author");
    res.status(201).json(populatedComment);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/answers/:id
export const updateAnswer = async (
  req: AuthRequest<{ id: string }, unknown, { text: string }>,
  res: Response,
) => {
  try {
    const answerId = req.params.id;
    const { text } = req.body;
    const authorId = req.userId;
    const author = await UserSchema.findById(authorId);
    if (!author) return res.status(404).json({ message: "Author not found" });
    if (!(await isAuthorOrStaff(req, answerId, AnswerSchema)))
      return res.status(403).json({ message: "Forbidden" });

    await AnswerSchema.findByIdAndUpdate(answerId, { $set: { text } });
    res.status(200).json({ message: "Successfully edited answer" });
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/answers/:id/votes
export const voteAnswer = async (
  req: AuthRequest<{ id: string }, NonNullable<unknown>, { vote: 1 | -1 }>,
  res: Response,
) => {
  try {
    const answerId = req.params.id;
    const { vote } = req.body;
    const voterId = req.userId;
    const voter = await UserSchema.findById(voterId);
    if (!voter) return res.status(404).json({ message: "No such voter" });
    if (voter.reputation < 50 && !voter.isStaff)
      return res.status(400).json({ message: "Not enough reputation" });
    const answer = await AnswerSchema.findById(answerId);
    if (!answer) return res.status(404).json({ error: "Answer not found" });
    const authorId = answer.author._id;
    const author = await UserSchema.findById(authorId);
    if (!author) return res.status(404).json({ error: "Author not found" });
    answer.votes += vote;
    author.reputation += vote * (vote > 0 ? 5 : 10);
    answer.save();
    author.save();
    res.json(author.reputation);
  } catch (err) {
    handleError(err, res);
  }
};
