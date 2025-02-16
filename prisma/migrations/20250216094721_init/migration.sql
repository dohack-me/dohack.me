-- CreateTable
CREATE TABLE "hint" (
    "hintId" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "hint" TEXT NOT NULL,

    CONSTRAINT "hint_pkey" PRIMARY KEY ("hintId")
);

-- CreateIndex
CREATE UNIQUE INDEX "hint_hintId_key" ON "hint"("hintId");

-- AddForeignKey
ALTER TABLE "hint" ADD CONSTRAINT "hint_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
