import express from "express";
import { getAnswers } from "../controllers/answer.controller";

const router = express.Router();

router.get("/", getAnswers);

export default router;
