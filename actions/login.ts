"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!"};
  }

  return { success: "Login successful!" };
}