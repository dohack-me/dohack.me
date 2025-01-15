/*
  Warnings:

  - You are about to drop the column `url` on the `websites` table. All the data in the column will be lost.
  - Added the required column `image` to the `websites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `websites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "websites" DROP COLUMN "url",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "website_containers" (
    "userId" UUID NOT NULL,
    "websiteId" UUID NOT NULL,

    CONSTRAINT "website_containers_pkey" PRIMARY KEY ("userId","websiteId")
);

-- AddForeignKey
ALTER TABLE "website_containers" ADD CONSTRAINT "website_containers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_containers" ADD CONSTRAINT "website_containers_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
