"use server";

import { currentRole } from "@/lib/currentRole";
import { UserRole } from "@prisma/client";

export async function adminAction() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action." };
  }

  return { error: "Forbidden Server Action!" };
}
