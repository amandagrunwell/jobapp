/*
  Warnings:

  - You are about to drop the column `domain_id` on the `emailAccounts` table. All the data in the column will be lost.
  - You are about to drop the `domain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emailAccounts" DROP CONSTRAINT "emailAccounts_domain_id_fkey";

-- DropForeignKey
ALTER TABLE "mail" DROP CONSTRAINT "mail_domain_id_fkey";

-- AlterTable
ALTER TABLE "emailAccounts" DROP COLUMN "domain_id";

-- DropTable
DROP TABLE "domain";

-- DropTable
DROP TABLE "mail";
