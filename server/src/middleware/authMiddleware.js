import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers?.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded?._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong in auth middleware" });
  }
};
