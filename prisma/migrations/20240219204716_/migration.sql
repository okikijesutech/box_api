/*
  Warnings:

  - The `quantity` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "accName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "accNo" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "img" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
