-- CreateTable
CREATE TABLE "userUsed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "use" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userUsed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userUsed" ADD CONSTRAINT "userUsed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
