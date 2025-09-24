import { EnvStore } from "./types";

export const envStore: EnvStore = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  AWS_REGION: process.env.awsRegion || "",
  AWS_ACCESS_KEY_ID: process.env.awsAccessKeyId || "",
  AWS_SECRET_KEY: process.env.secretAccessKey || "",
  AWS_BUCKET_NAME: process.env.awsBucketName || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: process.env.SMTP_PORT || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_USER: process.env.SMTP_USER || "",
  ActiveDomain: process.env.ActiveDomain || "",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
};

const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as (keyof EnvStore)[]).forEach((envVar) => {
    if (process.env[envVar]) {
      envStore[envVar] = process.env[envVar] || "";
    }
  });
};
export const configureEnv = async (): Promise<void> => {
  setEnvStoreFromEnvironment();

  const emptyDataResults = (Object.keys(envStore) as (keyof EnvStore)[]).filter(
    (envVar) => envStore[envVar] === ""
  );

  if (emptyDataResults.length > 0) {
    console.log(`Missing data in environment: ${emptyDataResults.join(", ")}`);
    process.exit(1);
  }
};

export default envStore;
