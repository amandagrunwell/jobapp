// lib/mail.ts
import envStore from "@/app/envStore/store";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type AttachmentInput =
  | { filename: string; path: string } // file path on disk
  | { filename: string; content: Buffer } // buffer
  | { filename: string; content: NodeJS.ReadableStream } // stream
  | { filename: string; content: string; encoding?: string }; // base64/text

type SendMailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: AttachmentInput[];
  from?: string;
};

const SMTP_OPTIONS: SMTPTransport.Options = {
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || "", // SMTP username
    pass: process.env.SMTP_PASS || "", // SMTP password (or app password / OAuth token)
  },
  // optional tls config:
  tls: {
    // do not fail on invalid certs when testing; remove in prod
    rejectUnauthorized: process.env.NODE_ENV === "production",
  },
};

const transporter = nodemailer.createTransport(SMTP_OPTIONS);

// optional: verify transporter at startup (throws if misconfigured)
export async function verifyTransporter(): Promise<void> {
  try {
    await transporter.verify();
    console.log("SMTP transporter verified");
  } catch (err) {
    console.error("SMTP verification failed:", err);
    throw err;
  }
}

/**
 * sendMail - send HTML email with attachments
 */
export async function sendMail(
  opts: SendMailOptions
): Promise<nodemailer.SentMessageInfo> {
  const message = {
    from: opts.from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    attachments: opts.attachments?.map((a) => {
      // normalize attachments to nodemailer's expected shape
      return {
        filename: a.filename,
        // path OR content OR content + encoding
        // @ts-ignore - nodemailer accepts these fields
        ...("path" in a ? { path: (a as any).path } : {}),
        ...("content" in a ? { content: (a as any).content } : {}),
        ...("encoding" in a && (a as any).encoding
          ? { encoding: (a as any).encoding }
          : {}),
      };
    }),
  };

  const info = await transporter.sendMail(message);
  return info;
}
