import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum(["user", "admin"]).optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(4),
  newPassword: z.string().min(4),
});
