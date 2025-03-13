import { db } from "@/lib/db";

export async function getTwoFactorConfirmationByUserId(id: string) {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId: id },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
}
