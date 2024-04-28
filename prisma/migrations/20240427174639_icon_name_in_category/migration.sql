/*
  Warnings:

  - You are about to drop the column `image_url` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image_url",
ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000',
ADD COLUMN     "icon_name" TEXT NOT NULL DEFAULT 'wallet';
