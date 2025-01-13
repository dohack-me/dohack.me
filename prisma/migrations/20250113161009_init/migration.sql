/*
  Warnings:

  - Changed the type of `port` on the `sockets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "sockets" DROP COLUMN "port",
ADD COLUMN     "port" INTEGER NOT NULL;
