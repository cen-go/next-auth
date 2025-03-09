import { v4 as uuidV4} from "uuid";

import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";

export async function generateVerificationToken(email:string) {
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
    }
  });

  return verificationToken;
}