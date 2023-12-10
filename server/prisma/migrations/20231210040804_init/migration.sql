/*
  Warnings:

  - You are about to drop the column `dosage` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClinicalIllness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAlergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserClinicalIllness` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAlergy" DROP CONSTRAINT "UserAlergy_allergyId_fkey";

-- DropForeignKey
ALTER TABLE "UserAlergy" DROP CONSTRAINT "UserAlergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserClinicalIllness" DROP CONSTRAINT "UserClinicalIllness_clinicalIllnessId_fkey";

-- DropForeignKey
ALTER TABLE "UserClinicalIllness" DROP CONSTRAINT "UserClinicalIllness_userId_fkey";

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "dosage",
DROP COLUMN "time",
ADD COLUMN     "preferences" TEXT[];

-- DropTable
DROP TABLE "Allergy";

-- DropTable
DROP TABLE "ClinicalIllness";

-- DropTable
DROP TABLE "UserAlergy";

-- DropTable
DROP TABLE "UserClinicalIllness";

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "alergies" TEXT NOT NULL DEFAULT 'Няма извести алергии',
    "chronicalDiseases" TEXT NOT NULL DEFAULT 'Няма извести хронични заболявания',
    "Diseases" TEXT NOT NULL DEFAULT 'Няма извести заболявания',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCondition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
