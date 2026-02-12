import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "") ||
      null;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const isVerified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(isVerified?._id);
    if (!user) {
      res.status(401).json({ msg: "User validation failed" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token for authorization failed !!!" });
  }
};
