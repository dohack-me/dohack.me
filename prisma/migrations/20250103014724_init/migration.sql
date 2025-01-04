/*
  Warnings:

  - You are about to drop the `challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repository` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_imageId_fkey";

-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_repositoryId_fkey";

-- DropTable
DROP TABLE "challenge";

-- DropTable
DROP TABLE "image";

-- DropTable
DROP TABLE "repository";

-- DropTable
DROP TABLE "user_role";

-- CreateTable
CREATE TABLE "repositorys" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "organizationLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repositorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "answer" TEXT NOT NULL,
    "authors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "repositoryId" UUID NOT NULL,
    "imageId" UUID,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "role" "AppRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solves" (
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "solves_pkey" PRIMARY KEY ("userId","challengeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositorys_id_key" ON "repositorys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_id_key" ON "challenges"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_name_key" ON "challenges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_image_key" ON "images"("image");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositorys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solves" ADD CONSTRAINT "solves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solves" ADD CONSTRAINT "solves_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
