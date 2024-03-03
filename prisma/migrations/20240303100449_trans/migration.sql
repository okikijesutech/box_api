/*
  Warnings:

  - Added the required column `price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
