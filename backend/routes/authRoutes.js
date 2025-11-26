import express from "express";
import {
  loginUser,
  registerUser,
  getUserData,
  updateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/update-profile", verifyToken, updateUser);
router.get("/get-user-data", verifyToken, async (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
