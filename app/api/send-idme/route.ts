import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import { sendMail } from "@/lib/mailer/mail";
import { IdmeEmail } from "@/lib/emails/idmeEmail";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, email } = data;
    const { subject, text, html } = IdmeEmail(firstName);
    const from = `${capitalizeName("Apex Group")} <${envStore.SMTP_USER}>`;
    const mail = await sendMail({
      to: email,
      subject,
      from,
      html,
      text,
    });

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
