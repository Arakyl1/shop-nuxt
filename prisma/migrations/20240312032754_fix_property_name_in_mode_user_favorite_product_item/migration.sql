/*
  Warnings:

  - You are about to drop the column `basketId` on the `UserFavoriteProductItem` table. All the data in the column will be lost.
  - Added the required column `favoriteId` to the `UserFavoriteProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteProductItem" DROP CONSTRAINT "UserFavoriteProductItem_basketId_fkey";

-- AlterTable
ALTER TABLE "UserFavoriteProductItem" DROP COLUMN "basketId",
ADD COLUMN     "favoriteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserFavoriteProductItem" ADD CONSTRAINT "UserFavoriteProductItem_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "UserFavoriteProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
