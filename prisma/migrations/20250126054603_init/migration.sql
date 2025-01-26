/*
  Warnings:

  - You are about to drop the column `host` on the `sockets` table. All the data in the column will be lost.
  - You are about to drop the column `port` on the `sockets` table. All the data in the column will be lost.
  - Added the required column `image` to the `sockets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `sockets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sockets" DROP COLUMN "host",
DROP COLUMN "port",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
