import { Resend } from "resend";

export interface SendMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  react?: any;
  html?: string;
  text?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    type?: string;
  }[];
}

export async function sendMail(
  opt: SendMailOptions,
  RESEND_API_KEY: string
): Promise<void> {
  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: opt.from,
      to: opt.to,
      subject: opt.subject,
      html: opt.html,
      text: opt.text,
      react: opt.react,
      attachments: opt.attachments,
    });
  } catch (err) {
    // ✅ Rethrow with context so the caller can handle it
    throw new Error(`Resend email failed: ${(err as Error).message}`);
  }
}
