/*
  Warnings:

  - Added the required column `title` to the `hint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hint" ADD COLUMN     "title" TEXT NOT NULL;
