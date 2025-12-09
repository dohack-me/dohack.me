-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CRYPTO', 'FORENSICS', 'WEB', 'REV', 'PWN', 'MISC');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('WEBSITE', 'SOCKET');

-- CreateTable
CREATE TABLE "repository" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sourceLink" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "organizationLink" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
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
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "repositoryId" UUID NOT NULL,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "type" "ServiceType" NOT NULL,
    "image" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_instance" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_instance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solve" (
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "solve_pkey" PRIMARY KEY ("userId","challengeId")
);

-- CreateTable
CREATE TABLE "hint" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "hint" TEXT NOT NULL,

    CONSTRAINT "hint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark" (
    "userId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("userId","challengeId")
);

-- CreateTable
CREATE TABLE "user"
(
    "id" UUID NOT NULL,
    "name"          TEXT    NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role"          TEXT    NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session"
(
    "id"        UUID         NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token"     TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId"    UUID         NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
                           "id"                    UUID NOT NULL,
                           "accountId"             TEXT NOT NULL,
                           "providerId"            TEXT NOT NULL,
                           "userId"                UUID NOT NULL,
                           "accessToken"           TEXT,
                           "refreshToken"          TEXT,
                           "idToken"               TEXT,
                           "accessTokenExpiresAt"  TIMESTAMP(3),
                           "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
                           "password"              TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

                           CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification"
(
    "id"         UUID         NOT NULL,
    "identifier" TEXT         NOT NULL,
    "value"      TEXT         NOT NULL,
    "expiresAt"  TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repository_id_key" ON "repository"("id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_id_key" ON "challenge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_id_key" ON "service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_instance_id_key" ON "service_instance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_instance_userId_serviceId_key" ON "service_instance"("userId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "hint_id_key" ON "hint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user" ("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session" ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session" ("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account" ("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_instance"
    ADD CONSTRAINT "service_instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_instance" ADD CONSTRAINT "service_instance_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solve"
    ADD CONSTRAINT "solve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solve" ADD CONSTRAINT "solve_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hint" ADD CONSTRAINT "hint_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark"
    ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session"
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
