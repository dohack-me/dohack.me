-- DropIndex
DROP INDEX "challenge_name_key";

-- AlterTable
ALTER TABLE "challenge" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "repository" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT false;
