import { uploadFile } from "@/lib/s3/uploadFile";

export function requestData(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const ssn = formData.get("ssn") as string;
  const dob = formData.get("dob") as string;
  const employer = formData.get("employer") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const ref1Name = formData.get("ref1Name") as string;
  const ref1Phone = formData.get("ref1Phone") as string;
  const ref1Email = formData.get("ref1Email") as string;
  const ref2Name = formData.get("ref2Name") as string;
  const ref2Phone = formData.get("ref2Phone") as string;
  const ref2Email = formData.get("ref2Email") as string;
  const criminalRecord = formData.get("criminalRecord") as string;

  return {
    firstName,
    lastName,
    address,
    email,
    phone,
    ssn,
    employer,
    jobTitle,
    ref1Email,
    ref1Name,
    ref1Phone,
    ref2Email,
    ref2Name,
    ref2Phone,
    criminalRecord,
    dob,
  };
}

export type requestData = {
  firstName: string;
  lastName: string;
  address: string;
  dob: string;
  email: string;
  phone: string;
  ssn: string;
  employer: string;
  jobTitle: string;
  ref1Email: string;
  ref1Name: string;
  ref1Phone: string;
  ref2Email: string;
  ref2Name: string;
  ref2Phone: string;
  criminalRecord: string;
};

export async function uploadAFile(
  file: File,
  fileName: string,
  applicant: any
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await uploadFile(
    {
      name: `${fileName}.${file.type.split("/")[1]}`,
      type: file.type,
      buffer,
    },
    `${applicant.firstName}_${applicant.lastName}`
  );
  return result.url;
}
