import { AuthRequest } from "../../types/express";
import { handleError } from "../utils";
import { Request, Response } from "express";
import CommentSchema from "../schema/comment.schema";
import { isAuthorOrStaff } from "../utils/auth";
import UserSchema from "../schema/user.schema";

// GET /api/comments
export const getComments = async (_req: Request, res: Response) => {
  try {
    const comment = await CommentSchema.find().populate("author");
    return res.status(200).json(comment);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/comments/:id
export const deleteComment = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  try {
    const isAllowed = await isAuthorOrStaff(req, req.params.id, CommentSchema);
    if (!isAllowed) res.status(403).json({ message: "Forbidden" });
    await CommentSchema.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/comments/:id/votes
export const voteComment = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  try {
    const commentId = req.params.id;
    const voterId = req.userId;
    const voter = await UserSchema.findById(voterId);
    if (!voter) return res.status(404).json({ message: "No such voter" });
    const comment = await CommentSchema.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    comment.votes += 1;
    comment.save();
    res.json(comment.votes);
  } catch (err) {
    handleError(err, res);
  }
};
