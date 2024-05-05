import express from "express";
import {
  getTag,
  getTags,
  updateTag,
  deleteTag,
  getQuestionByTag,
} from "../controllers/tag.controller";
import { verifyId } from "../middleware/id.middleware";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getTags);
router.get("/:id", verifyId, getTag);
router.get("/:name/questions", getQuestionByTag);
router.put("/:id", verifyToken, verifyId, updateTag);
router.delete("/:id", verifyToken, verifyId, deleteTag);

export default router;
