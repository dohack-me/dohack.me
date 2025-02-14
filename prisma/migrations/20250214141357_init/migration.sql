/*
  Warnings:

  - You are about to drop the column `port` on the `socket_instance` table. All the data in the column will be lost.
  - Added the required column `url` to the `socket_instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "socket_instance" DROP COLUMN "port",
ADD COLUMN     "url" TEXT NOT NULL;
