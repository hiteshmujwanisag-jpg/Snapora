import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error, "error while verifying token");
    return null;
  }
};

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error, "error while hasing password");
    return null;
  }
};

export const decryptPassword = async (Password, hashedPassword) => {
  try {
    const dcryptedPassword = await bcryptjs.compare(Password, hashedPassword);
    return dcryptedPassword;
  } catch (error) {
    console.log(error, "error while dcrypting password");
    return null;
  }
};
