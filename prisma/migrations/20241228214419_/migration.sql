/*
  Warnings:

  - A unique constraint covering the columns `[sender_email]` on the table `emailAccounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emailAccounts_sender_email_key" ON "emailAccounts"("sender_email");
