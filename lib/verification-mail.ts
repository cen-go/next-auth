import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "cengiz.uxdesign@gmail.com", // email parameter will be set as value in production
    subject: "Verify Your Email",
    html: `<p>Click <a href=${confirmLink}><strong style="color: #7373FF;">here</strong></a> to verify your email!</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "cengiz.uxdesign@gmail.com", // will be changed with email parameter in production
    subject: "Reset your password",
    html: `<p>Click <a href=${resetLink}><strong style="color: #7373FF;">here</strong></a> to reset your password!</p>`,
  });
}
