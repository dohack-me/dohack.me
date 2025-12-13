/*
  Warnings:

  - Added the required column `updatedAt` to the `bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `hint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `solve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmark"
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "updatedAt" DROP DEFAULT;


-- AlterTable
ALTER TABLE "hint"
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "service"
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "solve"
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "updatedAt" DROP DEFAULT;