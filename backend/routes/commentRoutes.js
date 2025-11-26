import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addComment,
  replyToComment,
  getPostComments
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", verifyToken, addComment);
router.post("/reply/:commentId", verifyToken, replyToComment);
router.get("/:postId", verifyToken, getPostComments);

export default router;
