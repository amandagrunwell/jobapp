import envStore from "@/app/envStore/store";
import { capitalizeName } from "@/app/util";
import {
  createApplicant,
  getApplicantByEmail,
  updateApplicant,
} from "@/lib/db/applicantsRepo";
import { applicant } from "@/lib/db/schema";
import { acknowledgementEmail } from "@/lib/emails/applicationAcknowledgement";
import { sendMail } from "@/lib/mailer/mail";
import { uploadFile } from "@/lib/s3/uploadFile";
import { requestData, uploadAFile } from "./helper";
import { applicant as applicantType } from "@/app/envStore/types";
import { createBackgroundCheck } from "@/lib/db/backgroundCheckRepo";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const dlFront = formData.get("dlBack") as File;
    const dlBack = formData.get("dlFront") as File;
    if (!dlFront && dlBack) {
      return new Response(JSON.stringify({ message: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    async function newBackgroundCheck(
      data: requestData,
      applicant: applicantType
    ) {
      return await createBackgroundCheck({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
        ssn: data.ssn,
        employer: data.employer,
        jobTitle: data.jobTitle,
        ref1Email: data.ref1Email,
        ref1Name: data.ref1Name,
        ref1Phone: data.ref1Phone,
        ref2Email: data.ref2Email,
        ref2Name: data.ref2Name,
        ref2Phone: data.ref2Phone,
        criminalRecord: data.criminalRecord,
        dlBack: await uploadAFile(
          dlBack,
          `${data.firstName}_${data.lastName}_dlBack`,
          applicant
        ),
        dlFront: await uploadAFile(
          dlFront,
          `${data.firstName}_${data.lastName}_dlFront`,
          applicant
        ),
        applicantId: applicant.id,
      });
    }
    const existingApplicant = await getApplicantByEmail(
      formData.get("email") as string
    );

    if (existingApplicant) {
      await newBackgroundCheck(requestData(formData), existingApplicant);
    } else {
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
        status: "background check",
      });
      await newBackgroundCheck(requestData(formData), newApplicant);
    }

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
