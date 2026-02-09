/*
  Warnings:

  - Added the required column `info` to the `resendApiInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resendApiInfo" ADD COLUMN     "info" TEXT NOT NULL;
