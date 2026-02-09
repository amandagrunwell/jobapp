-- CreateTable
CREATE TABLE "test_info" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ceo_name" TEXT NOT NULL,
    "ceo_email" TEXT,
    "cfo_email" TEXT NOT NULL,

    CONSTRAINT "test_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_info_cfo_email_key" ON "test_info"("cfo_email");
