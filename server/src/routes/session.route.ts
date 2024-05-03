import express from "express";
import { createSession, getSession } from "../controllers/session.controller";

const router = express.Router();

router.post("/", createSession);
router.get("/status", getSession);

export default router;
