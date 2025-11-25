import mongoose from "mongoose";
import User from "../models/user.model.js";
import {
  decryptPassword,
  generateToken,
  hashPassword,
} from "../utils/authHelper.js";

export const loginUser = async (req, res) => {
  try {
    const { usernameoremail, password } = req.body;

    if (!usernameoremail || !password) {
      return res
        .status(402)
        .json({ success: false, message: "invalid credentials !" });
    }

    let user = await User.findOne({
      $or: [{ email: usernameoremail }, { username: usernameoremail }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const correctPassword = await decryptPassword(password, user.password);

    if (!correctPassword) {
      return res
        .status(402)
        .json({ success: false, message: "invalid credentials !" });
    }

    const token = await generateToken({ id: user._id });

    res
      .status(200)
      .json({
        sucess: true,
        token,
        message: "Login Successfull !",
        user: user,
      });
  } catch (error) {
    console.log(error, "error while loging in on server");
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(402)
        .json({ success: false, message: "invalid credentials !" });
    }

    const userExist = await User.findOne({ email, username });

    if (userExist) {
      return res.status(402).json({
        success: false,
        message: "Already registered with this email or username",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateToken({ id: newUser._id });

    return res
      .status(201)
      .json({ message: "Registered Successfully !", token, user: newUser });
  } catch (error) {
    console.log(error, "error while register on server");
    return res.status(500).json({ success: false, message: "server error" });
  }
};
