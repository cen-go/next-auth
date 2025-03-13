import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
  name: z.string().min(1, {
    message: "Name is required"
  })
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password should be at least 6 characters"}),
});