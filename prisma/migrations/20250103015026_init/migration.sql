/*
  Warnings:

  - You are about to drop the `repositorys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_repositoryId_fkey";

-- DropTable
DROP TABLE "repositorys";

-- CreateTable
CREATE TABLE "repositories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "organizationLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositories_id_key" ON "repositories"("id");

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
