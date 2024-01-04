/*
  Warnings:

  - You are about to drop the `_BasketToProductCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BasketToProductCard" DROP CONSTRAINT "_BasketToProductCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_BasketToProductCard" DROP CONSTRAINT "_BasketToProductCard_B_fkey";

-- DropTable
DROP TABLE "_BasketToProductCard";

-- CreateTable
CREATE TABLE "BasketItem" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "cardId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,

    CONSTRAINT "BasketItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ProductCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
