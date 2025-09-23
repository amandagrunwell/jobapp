import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import { createApplicant, updateApplicant } from "@/lib/db/applicantsRepo";
import { applicant } from "@/lib/db/schema";
import { acknowledgementEmail } from "@/lib/emails/applicationAcknowledgement";
import { sendMail } from "@/lib/mailer/mail";
import { uploadFile } from "@/lib/s3/uploadFile";
import { NextResponse } from "next/server";
import { uploadAFile } from "../idme/helper";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return new Response(JSON.stringify({ message: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const buffer = Buffer.from(await file.arrayBuffer());
    const application = await createApplicant({
      firstName,
      lastName,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      dob: formData.get("dob") as string,
      location: formData.get("location") as string,
      device: formData.get("device") as string,
      internet: formData.get("internet") as string,
      availability: formData.get("availability") as string,
      experience: formData.get("experience") as string,
      note: formData.get("experience") as string,
      status: "applied",
      s3Url: await uploadAFile(
        file,
        `${firstName}_${lastName}_resume.${file.type.split("/")[1]}`,
        `${firstName}_${lastName}`
      ),
    });

    await uploadFile(
      {
        name: `${firstName}_${lastName}_resume.${file.type.split("/")[1]}`,
        type: file.type || "application/octet-stream",
        buffer,
      },
      `${application.firstName}_${application.lastName}`
    );

    const { subject, text, html } = acknowledgementEmail(application.firstName);
    const from = `${capitalizeName("Apex Group")} <${envStore.SMTP_USER}>`;
    const mail = await sendMail({
      to: application.email,
      subject,
      from,
      html,
      text,
    });

    return new Response(
      JSON.stringify({
        message: "Job placement successful",
        s3Url: "result.url",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.log(error);
    const pgErr = error.cause ?? error.originalError ?? error;

    if (pgErr.code === "23505" || pgErr?.detail?.includes("already exists")) {
      // Unique violation: duplicate email
      return NextResponse.json(
        { message: "This email has already been used to apply." },
        { status: 409 } // Conflict
      );
    }

    return new Response(JSON.stringify({ message: `Error Submitting` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
