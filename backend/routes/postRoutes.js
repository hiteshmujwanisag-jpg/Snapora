import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createPost, getAllPosts, getFollowingPosts, getPostsByUserId, toggleLikePost, toggleSavePost } from "../controllers/postController.js";
const router = express.Router();

router.get("/",verifyToken, getAllPosts);
router.post('/create',verifyToken,createPost)
router.get("/following",verifyToken,getFollowingPosts)
router.get("/user-posts/:userId",verifyToken,getPostsByUserId)
router.post("/:id/like", verifyToken, toggleLikePost);
router.post("/:id/save", verifyToken, toggleSavePost);


export default router;
