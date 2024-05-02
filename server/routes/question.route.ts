import express from "express";
import {
  createQuestion,
  getQuestionById,
  getQuestions,
} from "../controllers/question.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", verifyToken, createQuestion);

export default router;
