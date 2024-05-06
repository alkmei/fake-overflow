import express from "express";
import {
  deleteComment,
  getComments,
  voteComment,
} from "../controllers/comment.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getComments);
router.delete("/:id", verifyToken, verifyId, deleteComment);
router.post("/:id/votes", verifyToken, verifyId, voteComment);

export default router;
