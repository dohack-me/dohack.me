/*
  Warnings:

  - The primary key for the `hint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hintId` on the `hint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `hint` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `hint` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "hint_hintId_key";

-- AlterTable
ALTER TABLE "hint" DROP CONSTRAINT "hint_pkey",
DROP COLUMN "hintId",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "hint_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "hint_id_key" ON "hint"("id");
