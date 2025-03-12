"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { newPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-tokens";

export async function newPasswordAction(
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) {
  if (!token) {
    return { error: "Password reset token does not exist!" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Password reset token does not exist!" };
  }

  const isExpired = new Date(existingToken.expires) < new Date();

  if (isExpired) {
    return { error: "Password reset token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  const newPassword = validatedFields.data.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Password successfully updated." };
}
