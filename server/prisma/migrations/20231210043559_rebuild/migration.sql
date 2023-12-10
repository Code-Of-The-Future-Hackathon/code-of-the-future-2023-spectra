/*
  Warnings:

  - You are about to drop the column `Diseases` on the `Condition` table. All the data in the column will be lost.
  - You are about to drop the column `chronicalDiseases` on the `Condition` table. All the data in the column will be lost.
  - You are about to drop the `userUsed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userUsed" DROP CONSTRAINT "userUsed_userId_fkey";

-- AlterTable
ALTER TABLE "Condition" DROP COLUMN "Diseases",
DROP COLUMN "chronicalDiseases",
ADD COLUMN     "chronicDiseases" TEXT NOT NULL DEFAULT 'Няма извести хронични заболявания',
ADD COLUMN     "diseases" TEXT NOT NULL DEFAULT 'Няма извести заболявания';

-- DropTable
DROP TABLE "userUsed";

-- CreateTable
CREATE TABLE "userUsedMedicine" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "medicine" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userUsedMedicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userUsedMedicine" ADD CONSTRAINT "userUsedMedicine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
