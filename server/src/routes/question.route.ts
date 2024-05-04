import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionByTag,
  getQuestions,
  postAnswer,
  postCommentToQuestion,
  updateQuestion,
} from "../controllers/question.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", verifyId, getQuestionById);
router.post("/:id/answers", verifyToken, verifyId, postAnswer);
router.get("/tagged/:tag", getQuestionByTag);
router.post("/", verifyToken, createQuestion);
router.put("/:id", verifyToken, verifyId, updateQuestion);
router.delete("/:id", verifyToken, verifyId, deleteQuestion);
router.post("/:id/comments", verifyToken, verifyId, postCommentToQuestion);

export default router;
