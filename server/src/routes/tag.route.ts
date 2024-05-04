import express from "express";
import { getTag, getTags } from "../controllers/tag.controller";
import { verifyId } from "../middleware/id.middleware";
import { getQuestionByTag } from "../controllers/tag.controller";

const router = express.Router();

router.get("/", getTags);
router.get("/:id", verifyId, getTag);
router.get("/:name/questions", getQuestionByTag);

export default router;
