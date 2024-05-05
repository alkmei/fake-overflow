import { AuthRequest } from "../../types/express";
import { handleError } from "../utils";
import { Request, Response } from "express";
import CommentSchema from "../schema/comment.schema";
import { isAuthorOrStaff } from "../utils/auth";
import UserSchema from "../schema/user.schema";

// GET /api/comments
export const getComments = async (req: Request, res: Response) => {
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
    const comment = await CommentSchema.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/comments/:id/votes
export const voteComment = async (
  req: AuthRequest<{ id: string }, {}, { vote: 1 | -1 }>,
  res: Response,
) => {
  try {
    const commentId = req.params.id;
    const { vote } = req.body;
    const voterId = req.userId;
    const voter = await UserSchema.findById(voterId);
    if (!voter) return res.status(404).json({ message: "No such voter" });
    if (voter.reputation < 50)
      return res.status(400).json({ message: "Not enough reputation" });
    const comment = await CommentSchema.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    comment.votes += vote;
    comment.save();
  } catch (err) {
    handleError(err, res);
  }
};
