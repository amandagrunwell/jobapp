import envStore from "@/app/envStore/store";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: envStore.AWS_REGION,
  credentials: {
    accessKeyId: envStore.AWS_ACCESS_KEY_ID,
    secretAccessKey: envStore.AWS_SECRET_KEY,
  },
});

export async function uploadFile(
  file: { name: string; type: string; buffer: Buffer },
  clientName: string
) {
  const bucketName = envStore.AWS_BUCKET_NAME;
  const prefix = `${clientName}/`;

  // check if folder exists (optional)
  await s3.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 1,
    })
  );

  const fileKey = `${prefix}${file.name}`;

  // ✅ Use Buffer directly
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.type,
      ACL: "public-read",
    })
  );

  return {
    url: `https://${bucketName}.s3.${envStore.AWS_REGION}.amazonaws.com/${fileKey}`,
  };
}
