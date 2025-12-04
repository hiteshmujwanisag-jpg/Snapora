import express from "express"
import { verifyToken } from "../middleware/authMiddleware";
import { getMessages}  from "../controllers/messageController.js"
const router = express.Router();

router.get('/:chatId', verifyToken, getMessages);

export default router;
