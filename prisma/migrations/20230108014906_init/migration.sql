-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RefrechToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAta" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "RefrechToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "art" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "categor" TEXT NOT NULL,
    "subcategor" TEXT,
    "price" INTEGER NOT NULL,
    "itemArt" TEXT NOT NULL,
    "itemMod" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "top" BOOLEAN DEFAULT false,
    "news" BOOLEAN DEFAULT false,
    "sale" BOOLEAN DEFAULT false,
    "availability" BOOLEAN DEFAULT false,
    "pickUp" BOOLEAN DEFAULT false,
    "underTheOrder" BOOLEAN DEFAULT false,
    "delivery" BOOLEAN DEFAULT false,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "ranting" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT DEFAULT ''
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardId" INTEGER NOT NULL,
    "ranting" INTEGER,
    "text" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ProductCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Characteristic" (
    "titleID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "productCardId" INTEGER,
    CONSTRAINT "Characteristic_productCardId_fkey" FOREIGN KEY ("productCardId") REFERENCES "ProductCard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CharacteristicItem" (
    "itemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "characteristicTitle" INTEGER,
    CONSTRAINT "CharacteristicItem_characteristicTitle_fkey" FOREIGN KEY ("characteristicTitle") REFERENCES "Characteristic" ("titleID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "RefrechToken_token_key" ON "RefrechToken"("token");
