import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/question.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", verifyToken, createQuestion);
router.put("/:id", verifyToken, verifyId, updateQuestion);
router.delete("/:id", verifyToken, verifyId, deleteQuestion);

export default router;
