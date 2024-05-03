import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controllers/question.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", verifyToken, createQuestion);
router.put("/:id", verifyToken, updateQuestion);
router.delete("/:id", verifyToken, deleteQuestion);

export default router;
