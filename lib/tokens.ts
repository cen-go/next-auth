import { v4 as uuidV4 } from "uuid";
import crypto from "crypto"

import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export async function generateVerificationToken(email: string) {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 2 * 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
}

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10mins

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({where: {id: existingToken.id}});
  }

  const twoFactorToken = db.twoFactorToken.create({
    data: {
      token,
      expires,
      email,
    }
  })

  return twoFactorToken
}