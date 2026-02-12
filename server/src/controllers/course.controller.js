import Course from "../models/courseSchema.model.js";
import { createCourseSchema } from "../validation/course.validation.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select(
      "title description price image rating reviews",
    );
    return res
      .status(200)
      .json({ msg: "Courses fetched successfully", courses });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const addCourses = async (req, res) => {
  try {
    const { success, data, error } = createCourseSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(400)
        .json({ msg: "Validation failed", error: error.issues[0].message });
    }

    const courseCreated = await Course.create(data);
    if (!courseCreated) {
      return res.status(400).json({ msg: "Course Creation Failed" });
    }
    return res
      .status(201)
      .json({ msg: "Course created successfully", course: courseCreated });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: error.message });
  }
};

export const rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating } = req.body;
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ msg: "Rating must be a number between 0 and 5" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    course.rating = rating;
    await course.save();
    return res.status(200).json({ msg: "Course rated successfully", course });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const reviewCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { reviews } = req.body;
    if (typeof reviews !== "number") {
      return res.status(400).json({ msg: "Review must be a number" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    course.reviews = reviews;
    await course.save();
    return res
      .status(200)
      .json({ msg: "Course reviewed successfully", course });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    return res.status(200).json({ msg: "Course fetched successfully", course });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    return res.status(200).json({ msg: "Course deleted successfully", course });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
