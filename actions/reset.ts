"use server"

import * as z from "zod";
import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/verification-mail";

export async function resetAction(values: z.infer<typeof resetSchema>) {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid email!"};
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {success: "Email sent."}
  }

  // TODO: Generate token and send email.
  const token = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(token.email, token.token);

  return {success: "Email sent"};
}