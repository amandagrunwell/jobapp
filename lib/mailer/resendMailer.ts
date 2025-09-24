import envStore from "@/app/envStore/store";
import { Resend } from "resend";

// Define your mail options type (or import if already declared)
export interface SendMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    type?: string;
  }[];
}

// Make sure the env variable is set
const resend = new Resend(envStore.RESEND_API_KEY as string);

export async function sendMail(opt: SendMailOptions): Promise<void> {
  await resend.emails.send({
    from: opt.from,
    to: opt.to,
    subject: opt.subject,
    html: opt.html,
    attachments: opt.attachments,
    text: opt.text,
  });
}
