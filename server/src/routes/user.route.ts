import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getQuestionsOfUser,
  getTagsOfUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { verifyId } from "../middleware/id.middleware";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", verifyId, getUser);
router.get("/:id/questions", verifyId, getQuestionsOfUser);
router.get("/:id/tags", verifyId, getTagsOfUser);
router.post("/", createUser);
router.put("/:id", verifyToken, verifyId, updateUser);
router.delete("/:id", verifyToken, verifyId, deleteUser);

export default router;
