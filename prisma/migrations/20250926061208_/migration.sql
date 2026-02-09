-- CreateTable
CREATE TABLE "resendApiInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "domain" TEXT NOT NULL,
    "limitUsed" INTEGER NOT NULL,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "resendApiInfo_pkey" PRIMARY KEY ("id")
);
