import express from "express";
import { getTag, getTags } from "../controllers/tag.controller";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getTags);
router.get("/:id", verifyId, getTag);

export default router;
