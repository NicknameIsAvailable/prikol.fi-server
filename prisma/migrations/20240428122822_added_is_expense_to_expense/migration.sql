/*
  Warnings:

  - You are about to drop the column `isExpense` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isExpense";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isExpense" BOOLEAN NOT NULL DEFAULT true;
