-- CreateTable
CREATE TABLE "UserFavoriteProduct" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserFavoriteProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteProductItem" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "cardId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteProduct_userId_key" ON "UserFavoriteProduct"("userId");

-- AddForeignKey
ALTER TABLE "UserFavoriteProduct" ADD CONSTRAINT "UserFavoriteProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProductItem" ADD CONSTRAINT "UserFavoriteProductItem_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ProductCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteProductItem" ADD CONSTRAINT "UserFavoriteProductItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "UserFavoriteProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
