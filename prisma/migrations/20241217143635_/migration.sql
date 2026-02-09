-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('zoho', 'google', 'porkbun', 'namecheap', 'titan', 'gandi');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- CreateTable
CREATE TABLE "info" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ceo_name" TEXT NOT NULL,
    "ceo_email" TEXT,
    "cfo_email" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "isSanitized" BOOLEAN NOT NULL DEFAULT true,
    "organizationName" TEXT,
    "organizationId" TEXT,
    "organizationWebsite" TEXT,
    "user" TEXT DEFAULT '',

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emailAccounts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "service" "accountType" NOT NULL,
    "sender_email" TEXT NOT NULL,
    "sender_password" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "info" TEXT NOT NULL,
    "smtpHost" TEXT NOT NULL,
    "imapHost" TEXT NOT NULL,
    "smtpPort" INTEGER NOT NULL,
    "imapPort" INTEGER NOT NULL,

    CONSTRAINT "emailAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clAccounts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "routineNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "accountLevel" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'female',
    "amount" TEXT,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "clAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "info_cfo_email_key" ON "info"("cfo_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
