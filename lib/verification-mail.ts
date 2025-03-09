import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email:string, token:string) {
  const confirmLink = `http//localhost:3000/auth/new-verification?token=${token}`
  
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'cengiz.uxdesign@gmail.com', // email parameter will be set as value in production
    subject: 'Verify Your Email',
    html: `<p>Click <a href=${confirmLink}><strong style="color: #7373FF;">here</strong></a> to verify your email!</p>`
  });
}