/*
  Warnings:

  - Added the required column `domain_id` to the `emailAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "domain" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "emailAccounts" ADD COLUMN     "domain_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "emailAccounts" ADD CONSTRAINT "emailAccounts_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
