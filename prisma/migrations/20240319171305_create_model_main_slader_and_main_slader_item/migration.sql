-- CreateTable
CREATE TABLE "MainSlader" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainSlader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainSladerItem" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "mainPhoto" TEXT DEFAULT '',
    "main1024" TEXT,
    "main768" TEXT,
    "main600" TEXT,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "MainSladerItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MainSladerItem" ADD CONSTRAINT "MainSladerItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MainSlader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
