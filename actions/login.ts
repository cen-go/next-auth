"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

import { db } from "@/lib/db";
import { loginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/verification-mail";
import { redirect } from "next/navigation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

interface StatusMessage {
  error?: string;
  success?: string;
  status?: string;
  twoFactor?: boolean;
}

export async function loginAction(values: z.infer<typeof loginSchema>): Promise<StatusMessage> {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Invalid credentials!"};
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {
      error: "Email not verified!",
      success: "Sent the verification email again.",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const existingTwoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!existingTwoFactorToken) {
        return {error: "Invalid code!"};
      }

      if (existingTwoFactorToken.token !== code) {
        return {error: "Invalid code!"};
      }

      const hasExpired = new Date(existingTwoFactorToken.expires) < new Date();

      if (hasExpired) {
        await db.twoFactorToken.delete({
          where: { id: existingTwoFactorToken.id}
        });
        return {error: "Code has expired!"};
      }


      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {id: existingConfirmation.id}
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return {twoFactor: true, success: "2FA code sent."};
    }
  }

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
  return {success: "Login successful."}
}

export async function signOutAction() {
  await signOut();
  redirect("/auth/login");
}