import express from "express";
import {
  createSession,
  deleteSession,
  getSession,
} from "../controllers/session.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", createSession);
router.get("/", verifyToken, getSession);
router.delete("/", verifyToken, deleteSession);

export default router;
