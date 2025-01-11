/*
  Warnings:

  - You are about to drop the column `imageId` on the `challenges` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_imageId_fkey";

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "imageId",
ADD COLUMN     "composeFile" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "images";

-- DropEnum
DROP TYPE "AppRole";

-- CreateTable
CREATE TABLE "websites" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sockets" (
    "id" UUID NOT NULL,
    "host" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "sockets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "websites_id_key" ON "websites"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sockets_id_key" ON "sockets"("id");

-- AddForeignKey
ALTER TABLE "websites" ADD CONSTRAINT "websites_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sockets" ADD CONSTRAINT "sockets_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
