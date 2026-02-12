import mongoose, { Schema, model } from "mongoose";

const InstructorSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: String, required: true },
});

const PriceSchema = new Schema({
  original: { type: Number, required: true },
  discounted: { type: Number, required: true },
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    instructor: { type: InstructorSchema, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String },
    mode: { type: String },
    price: { type: PriceSchema, required: true },
    syllabus: { type: [String], default: [] },
    learning: { type: [String], default: [] },
    image: { type: String },
  },
  { timestamps: true },
);

const Course = model("CourseSkillNest", CourseSchema);

export default Course;
