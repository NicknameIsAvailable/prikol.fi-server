/*
  Warnings:

  - You are about to drop the column `currency` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "currency";

-- DropEnum
DROP TYPE "Currency";
