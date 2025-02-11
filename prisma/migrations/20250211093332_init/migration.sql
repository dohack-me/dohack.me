-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

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

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socket" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "socket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_instance" (
    "userId" UUID NOT NULL,
    "websiteId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "website_instance_pkey" PRIMARY KEY ("userId","websiteId")
);

-- CreateTable
CREATE TABLE "socket_instance" (
    "userId" UUID NOT NULL,
    "socketId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "socket_instance_pkey" PRIMARY KEY ("userId","socketId")
);

-- CreateTable
CREATE TABLE "solve" (
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "solve_pkey" PRIMARY KEY ("userId","challengeId")
);

-- CreateTable
CREATE TABLE "custom_user" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "custom_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "repository_id_key" ON "repository"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_id_key" ON "challenge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_name_key" ON "challenge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "website_id_key" ON "website"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socket_id_key" ON "socket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_user_id_key" ON "custom_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_user_userId_key" ON "custom_user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "website_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socket" ADD CONSTRAINT "socket_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_instance" ADD CONSTRAINT "website_instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "custom_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_instance" ADD CONSTRAINT "website_instance_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socket_instance" ADD CONSTRAINT "socket_instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "custom_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socket_instance" ADD CONSTRAINT "socket_instance_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "socket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solve" ADD CONSTRAINT "solve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "custom_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solve" ADD CONSTRAINT "solve_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_user" ADD CONSTRAINT "custom_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
