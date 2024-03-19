/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "imagePath" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "imagePath";
