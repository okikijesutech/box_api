-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "merchantType" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "password" SET DEFAULT 'user';
