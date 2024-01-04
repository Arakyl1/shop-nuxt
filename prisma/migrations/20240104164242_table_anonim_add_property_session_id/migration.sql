/*
  Warnings:

  - You are about to drop the column `ip` on the `Anonim` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Anonim` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Anonim` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Anonim_ip_key";

-- AlterTable
ALTER TABLE "Anonim" DROP COLUMN "ip",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anonim_sessionId_key" ON "Anonim"("sessionId");
