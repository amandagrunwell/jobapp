import { uploadFile } from "@/lib/s3/uploadFile";

export function requestData(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const otherNames = formData.get("otherNames") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const phone = formData.get("phone") as string;
  const zipCode = formData.get("zipCode") as string;
  const ssn = formData.get("ssn") as string;
  const idmeUsername = formData.get("idmeUsername") as string;
  const idmePassword = formData.get("idmePassword") as string;
  const fatherFirst = formData.get("fatherFirst") as string;
  const fatherLast = formData.get("fatherLast") as string;
  const mothersFirst = formData.get("mothersFirst") as string;
  const mothersLast = formData.get("mothersLast") as string;
  const mothersMaiden = formData.get("mothersMaiden") as string;
  const stateOfBirth = formData.get("stateOfBirth") as string;
  const cityOfBirth = formData.get("cityOfBirth") as string;
  const dob = formData.get("dob") as string;

  return {
    firstName,
    lastName,
    otherNames,
    address,
    email,
    city,
    state,
    phone,
    zipCode,
    ssn,
    idmePassword,
    idmeUsername,
    fatherFirst,
    fatherLast,
    mothersFirst,
    mothersLast,
    mothersMaiden,
    stateOfBirth,
    cityOfBirth,
    dob,
  };
}

export type requestData = {
  firstName: string;
  lastName: string;
  otherNames: string;
  address: string;
  email: string;
  city: string;
  state: string;
  phone: string;
  zipCode: string;
  ssn: string;
  idmePassword: string;
  idmeUsername: string;
  fatherFirst: string;
  fatherLast: string;
  mothersFirst: string;
  mothersLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dob: string;
};

export async function uploadAFile(
  file: File,
  fileName: string,
  client_name: string
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await uploadFile(
    {
      name: `${fileName}.${file.type.split("/")[1]}`,
      type: file.type,
      buffer,
    },
    client_name
  );
  return result.url;
}
