import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import {} from "@/lib/emails/idmeEmail";
import { BackGroundCheckEmail } from "@/lib/emails/backGroundCheck";
import { sendMail } from "@/lib/mailer/resendMailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, email } = data;
    const { subject, text, html } = BackGroundCheckEmail(firstName);
    const from = `${capitalizeName("Apex Group")} <${envStore.SMTP_USER}>`;
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
