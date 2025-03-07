"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

import { loginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials", status: "error" };
        default:
          return { error: "Something went wrong", status: "error" };
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut()
}