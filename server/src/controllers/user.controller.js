import { User } from "../models/userSchema.model.js";
import Course from "../models/courseSchema.model.js";
import jwt from "jsonwebtoken";
import {
  createUserSchema,
  loginUserSchema,
} from "../validation/user.validation.js";

const generateTokens = async (id) => {
  try {
    const user = await User.findById({ _id: id });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.RefreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const registerUser = async (req, res) => {
  try {
    const { success, data, error } = createUserSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ msg: "Validation failed", error: error.issues[0].message });
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already in use" });
    }
    const userCreated = await User.create(data);
    if (!userCreated) {
      return res.status(400).json({ msg: "User Registration Failed" });
    }
    const createdUser = await User.findById(userCreated._id).select(
      "-password",
    );
    return res
      .status(201)
      .json({ msg: "User created successfully", user: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { success, data, error } = loginUserSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ msg: "Validation failed", error: error.issues[0].message });
    }

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }
    const tokens = await generateTokens(user._id);
    const accessOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, //  1 days in mili seconds
    };
    const refreshOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in mili seconds
    };
    return res
      .status(200)
      .cookie("accessToken", tokens.accessToken, accessOption)
      .cookie("refreshToken", tokens.refreshToken, refreshOption)
      .json({
        msg: "Login successful",
        tokens,
        user: { name: user.name, email: user.email, role: user.role },
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    user.RefreshToken = null;
    await user.save({ validateBeforeSave: false });
    res
      .status(200)
      .cookie("accessToken", "", { maxAge: 0 })
      .cookie("refreshToken", "", { maxAge: 0 })
      .json({ msg: "Logout successful" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("coursesEnrolled");
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    return res
      .status(200)
      .json({ msg: "User details fetched successfully", user });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ msg: "User details updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const generateAccessToken = async (req, res) => {
  try {
    const token =
      req.cookies?.refreshToken ||
      req.header("Authorization").replace("Bearer ", "") ||
      null;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const isVerified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(isVerified?._id);
    if (!user) {
      res.status(401).json({ msg: "User validation failed" });
    }
    const accessToken = await user.generateAccessToken();
    const accessOption = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, //  1 days in mili seconds
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, accessOption)
      .json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const validateUser = async (req, res) => {
  return res.status(201).json({ loggedIn: true });
};

export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    user.coursesEnrolled.push(courseId);
    await user.save();
    return res.status(200).json({ msg: "Course enrolled successfully", user });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
