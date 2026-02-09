-- CreateEnum
CREATE TYPE "providerType" AS ENUM ('resend', 'postmark');

-- AlterTable
ALTER TABLE "resendApiInfo" ADD COLUMN     "provider" "providerType" NOT NULL DEFAULT 'resend';
