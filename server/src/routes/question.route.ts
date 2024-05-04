import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  postAnswer,
  postCommentToQuestion,
  updateQuestion,
  voteQuestion,
} from "../controllers/question.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", verifyId, getQuestionById);
router.post("/:id/answers", verifyToken, verifyId, postAnswer);
router.post("/", verifyToken, createQuestion);
router.put("/:id", verifyToken, verifyId, updateQuestion);
router.delete("/:id", verifyToken, verifyId, deleteQuestion);
router.post("/:id/comments", verifyToken, verifyId, postCommentToQuestion);
router.post("/:id/votes", verifyToken, verifyId, voteQuestion);

export default router;
