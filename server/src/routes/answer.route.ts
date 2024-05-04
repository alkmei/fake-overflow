import express from "express";
import {
  deleteAnswer,
  getAnswers,
  postCommentToAnswer,
} from "../controllers/answer.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getAnswers);
router.delete("/:id", verifyToken, verifyId, deleteAnswer);
router.post("/:id/comments", verifyToken, verifyId, postCommentToAnswer);

export default router;
