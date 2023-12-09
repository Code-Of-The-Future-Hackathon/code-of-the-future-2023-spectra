/*
  Warnings:

  - The primary key for the `Allergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pharmacy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductPharmacy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `PharmacyId` on the `ProductPharmacy` table. All the data in the column will be lost.
  - You are about to drop the column `ProductId` on the `ProductPharmacy` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductPharmacy` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `statusId` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserAlergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AllergyId` on the `UserAlergy` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `UserAlergy` table. All the data in the column will be lost.
  - The primary key for the `UserPreferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ProductId` on the `UserProduct` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `UserProduct` table. All the data in the column will be lost.
  - You are about to drop the `ClynicalIlness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserClynicalIlness` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pharmacyId` to the `ProductPharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductPharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allergyId` to the `UserAlergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserAlergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_formId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPharmacy" DROP CONSTRAINT "ProductPharmacy_PharmacyId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPharmacy" DROP CONSTRAINT "ProductPharmacy_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statusId_fkey";

-- DropForeignKey
ALTER TABLE "UserAlergy" DROP CONSTRAINT "UserAlergy_AllergyId_fkey";

-- DropForeignKey
ALTER TABLE "UserAlergy" DROP CONSTRAINT "UserAlergy_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UserClynicalIlness" DROP CONSTRAINT "UserClynicalIlness_ClynicalIlnessId_fkey";

-- DropForeignKey
ALTER TABLE "UserClynicalIlness" DROP CONSTRAINT "UserClynicalIlness_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_UserId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Allergy_id_seq";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Form_id_seq";

-- AlterTable
ALTER TABLE "Pharmacy" DROP CONSTRAINT "Pharmacy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pharmacy_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "formId" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductPharmacy" DROP CONSTRAINT "ProductPharmacy_pkey",
DROP COLUMN "PharmacyId",
DROP COLUMN "ProductId",
DROP COLUMN "price",
ADD COLUMN     "pharmacyId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductPharmacy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductPharmacy_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "statusId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserAlergy" DROP CONSTRAINT "UserAlergy_pkey",
DROP COLUMN "AllergyId",
DROP COLUMN "UserId",
ADD COLUMN     "allergyId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAlergy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserAlergy_id_seq";

-- AlterTable
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPreferences_id_seq";

-- AlterTable
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_pkey",
DROP COLUMN "ProductId",
DROP COLUMN "UserId",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserProduct_id_seq";

-- DropTable
DROP TABLE "ClynicalIlness";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "UserClynicalIlness";

-- CreateTable
CREATE TABLE "ClinicalIllness" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicalIllness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClinicalIllness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clinicalIllnessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserClinicalIllness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlergy" ADD CONSTRAINT "UserAlergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlergy" ADD CONSTRAINT "UserAlergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClinicalIllness" ADD CONSTRAINT "UserClinicalIllness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClinicalIllness" ADD CONSTRAINT "UserClinicalIllness_clinicalIllnessId_fkey" FOREIGN KEY ("clinicalIllnessId") REFERENCES "ClinicalIllness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPharmacy" ADD CONSTRAINT "ProductPharmacy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPharmacy" ADD CONSTRAINT "ProductPharmacy_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
