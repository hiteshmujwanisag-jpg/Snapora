import express from "express"
import { verifyToken } from "../middleware/authMiddleware";
import { getOrCreatePrivateChat, getUserChats  } from "../controllers/chatController.js"
const router = express.Router(); 

router.post('/private', verifyToken, getOrCreatePrivateChat);
router.get('/', verifyToken, getUserChats);
router.post('/:chatId/mark-read', verifyToken, markRead);

export default router
