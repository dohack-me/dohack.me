/*
  Warnings:

  - You are about to drop the column `url` on the `socket_instance` table. All the data in the column will be lost.
  - Added the required column `port` to the `socket_instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "socket_instance" DROP COLUMN "url",
ADD COLUMN     "port" INTEGER NOT NULL;
