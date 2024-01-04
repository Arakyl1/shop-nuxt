-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('CATEGOR', 'MAKER', 'OTHER', 'SUBCATEGOR', 'CLASS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anonim" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,

    CONSTRAINT "Anonim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefrechToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RefrechToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "art" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "itemArt" TEXT NOT NULL,
    "itemMod" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL,
    "type" "AttributeType" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "productCardId" INTEGER NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "ranting" INTEGER,
    "text" TEXT,
    "userId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characteristic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "productCardId" INTEGER NOT NULL,

    CONSTRAINT "Characteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacteristicItem" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "characteristicId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "CharacteristicItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "anonimId" INTEGER,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttributeToProductCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ParentChildren" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BasketToProductCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "RefrechToken_token_key" ON "RefrechToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_userId_key" ON "Basket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_anonimId_key" ON "Basket"("anonimId");

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToProductCard_AB_unique" ON "_AttributeToProductCard"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToProductCard_B_index" ON "_AttributeToProductCard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ParentChildren_AB_unique" ON "_ParentChildren"("A", "B");

-- CreateIndex
CREATE INDEX "_ParentChildren_B_index" ON "_ParentChildren"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToProductCard_AB_unique" ON "_BasketToProductCard"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToProductCard_B_index" ON "_BasketToProductCard"("B");

-- AddForeignKey
ALTER TABLE "RefrechToken" ADD CONSTRAINT "RefrechToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productCardId_fkey" FOREIGN KEY ("productCardId") REFERENCES "ProductCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ProductCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characteristic" ADD CONSTRAINT "Characteristic_productCardId_fkey" FOREIGN KEY ("productCardId") REFERENCES "ProductCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacteristicItem" ADD CONSTRAINT "CharacteristicItem_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "Characteristic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_anonimId_fkey" FOREIGN KEY ("anonimId") REFERENCES "Anonim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProductCard" ADD CONSTRAINT "_AttributeToProductCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProductCard" ADD CONSTRAINT "_AttributeToProductCard_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentChildren" ADD CONSTRAINT "_ParentChildren_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentChildren" ADD CONSTRAINT "_ParentChildren_B_fkey" FOREIGN KEY ("B") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToProductCard" ADD CONSTRAINT "_BasketToProductCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Basket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToProductCard" ADD CONSTRAINT "_BasketToProductCard_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
