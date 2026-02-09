/*
  Warnings:

  - Added the required column `fromEmail` to the `mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mail" ADD COLUMN     "fromEmail" TEXT NOT NULL;
