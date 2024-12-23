-- CreateEnum
CREATE TYPE "AppRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CRYPTO', 'FORENSICS', 'WEB', 'REV', 'PWN', 'MISC');

-- CreateTable
CREATE TABLE "repository" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "organizationLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge" (
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

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" UUID NOT NULL,
    "role" "AppRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repository_id_key" ON "repository"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_id_key" ON "challenge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_name_key" ON "challenge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "image_id_key" ON "image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image_image_key" ON "image"("image");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_id_key" ON "user_role"("id");

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
