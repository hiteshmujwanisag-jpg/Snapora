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
    console.log(usernameoremail, password);

    if (!usernameoremail || !password) {
      return res
        .status(402)
        .json({ success: false, message: "invalid credentials !" });
    }

    let user = await User.findOne({
      $or: [{ email: usernameoremail }, { username: usernameoremail }],
    }).select("+password");

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

    res.status(200).json({
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

export const updateUser = async (req,res) =>{
  try {
    const userId = req.user._id

    const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true})
    
    return res.status(200).json({success:true,message:"User Updated Successfully !",user:updatedUser})
  } catch (error) {
    console.log(error,"error while updating user details")
    return res.status(500).json({success:false,message:"server error"})
  }
}

export const getUserData = async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "user data fetched Successfully",
        user: user,
      });
  } catch (error) {
    console.log(error, "error while fetching usedData from database");
    return res.status(500).json({ success: false, message: "server error" });
  }
};
