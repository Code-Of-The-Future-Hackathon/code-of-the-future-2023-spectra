/*
  Warnings:

  - You are about to drop the column `productId` on the `UserProduct` table. All the data in the column will be lost.
  - Added the required column `expert` to the `UserProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_productId_fkey";

-- AlterTable
ALTER TABLE "UserProduct" DROP COLUMN "productId",
ADD COLUMN     "advice" TEXT[],
ADD COLUMN     "expert" TEXT NOT NULL,
ADD COLUMN     "facts" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
