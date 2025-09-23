// export interface GoogleDriveCredentials {
//   type: string;
//   project_id: string;
//   private_key_id: string;
//   private_key: string;
//   client_email: string;
//   client_id: string;
//   auth_uri: string;
//   token_uri: string;
//   auth_provider_x509_cert_url: string;
//   client_x509_cert_url: string;
//   universe_domain: string;
// }

import { Applicant, BackgroundCheck, Idme } from "@/lib/db/schema";

export type applicant = {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  device: string;
  internet: string;
  availability: string;
  experience: string;
  s3Url: string | null;
  note: string;
};

export type fullData = {
  applicant: Applicant;
  idme: Idme;
  backgroundCheck: BackgroundCheck;
};
export interface EnvStore {
  DATABASE_URL: string;
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_KEY: string;
  AWS_BUCKET_NAME: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  ActiveDomain: string;
}

// export interface CustomEnvStore extends EnvStore {
//   googleDriveCredentials: GoogleDriveCredentials;
// }
