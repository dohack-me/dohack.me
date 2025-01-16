/*
  Warnings:

  - Added the required column `id` to the `website_instances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `website_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "website_instances" ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
