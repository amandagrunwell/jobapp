import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import { IdmeEmail } from "@/lib/emails/idmeEmail";
import { sendMail } from "@/lib/mailer/resendMailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    const { firstName, email } = data;
    const { subject, text, html } = IdmeEmail(firstName);
    const from = `${capitalizeName("Apex Focus Group")} <${
      envStore.SMTP_USER
    }>`;
    const mail = await sendMail(
      {
        to: email,
        subject,
        from,
        html,
        text,
      },
      envStore.RESEND_API_KEY
    );
    console.log(mail);

    return new Response(
      JSON.stringify({
        message: "Mail Sent successfully",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: `Error Submitting` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
