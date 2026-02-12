import z from "zod";

const instructorSchema = z.object({
  name: z.string().min(1, "Instructor name is required"),
  role: z.string().min(1, "Instructor role is required"),
  experience: z.string().min(1, "Instructor experience is required"),
});

const PriceSchema = z.object({
  original: z.number().positive("Original price must be a positive number"),
  discounted: z.number().positive("Discounted price must be a positive number"),
});

export const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  subtitle: z.string().optional(),
  instructor: instructorSchema,
  duration: z.string().min(1, "Duration is required"),
  price: PriceSchema,
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  image: z.string().url("Image must be a valid URL"),
  mode: z.enum(
    ["online", "offline", "Online", "Offline", "ONLINE", "OFFLINE"],
    "Mode must be either 'online' or 'offline'",
  ),
  syllabus: z.array(z.string()).min(1, "Syllabus is required"),
  learning: z.array(z.string()).min(1, "Learning is required"),
});
