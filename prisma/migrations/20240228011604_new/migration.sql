/*
  Warnings:

  - The `quantity` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_UserMerchants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserMerchants_AB_unique" ON "_UserMerchants"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMerchants_B_index" ON "_UserMerchants"("B");

-- AddForeignKey
ALTER TABLE "_UserMerchants" ADD CONSTRAINT "_UserMerchants_A_fkey" FOREIGN KEY ("A") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMerchants" ADD CONSTRAINT "_UserMerchants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
