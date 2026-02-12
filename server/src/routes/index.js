import Router from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserDetails,
  logoutUser,
  enrollCourse,
  validateUser,
  generateAccessToken,
} from "../controllers/user.controller.js";

import {
  getAllCourses,
  addCourses,
  rateCourse,
  reviewCourse,
  deleteCourse,
  getCourseById,
} from "../controllers/course.controller.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router
  .post("/signupuser", registerUser)
  .post("/loginuser", loginUser)
  .post("/logout", authMiddleware, logoutUser)
  .get("/isAuthenticated", authMiddleware, validateUser)
  .get("/refresh", generateAccessToken);

router.route("/user").get(authMiddleware, getUserDetails);
router.route("/user/:courseId").post(authMiddleware, enrollCourse);

router.route("/course").get(getAllCourses).post(authMiddleware, addCourses);
router
  .route("/course/:courseId")
  .get(getCourseById)
  .delete(authMiddleware, deleteCourse);

router.route("/course/:courseId/rate").patch(authMiddleware, rateCourse);
router.route("/course/:courseId/review").patch(authMiddleware, reviewCourse);

export default router;
