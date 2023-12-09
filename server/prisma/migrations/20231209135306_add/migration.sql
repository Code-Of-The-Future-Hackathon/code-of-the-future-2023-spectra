-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imgUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "payed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
