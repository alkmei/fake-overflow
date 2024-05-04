import { AuthRequest } from "../../types/express";
import { handleError } from "../utils";
import { Request, Response } from "express";
import CommentSchema from "../schema/comment.schema";
import { isAuthorOrStaff } from "../utils/auth";

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
