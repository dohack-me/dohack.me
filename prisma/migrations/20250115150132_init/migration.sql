/*
  Warnings:

  - You are about to drop the `website_containers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "website_containers" DROP CONSTRAINT "website_containers_userId_fkey";

-- DropForeignKey
ALTER TABLE "website_containers" DROP CONSTRAINT "website_containers_websiteId_fkey";

-- DropTable
DROP TABLE "website_containers";

-- CreateTable
CREATE TABLE "website_instances" (
    "userId" UUID NOT NULL,
    "websiteId" UUID NOT NULL,

    CONSTRAINT "website_instances_pkey" PRIMARY KEY ("userId","websiteId")
);

-- AddForeignKey
ALTER TABLE "website_instances" ADD CONSTRAINT "website_instances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_instances" ADD CONSTRAINT "website_instances_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
