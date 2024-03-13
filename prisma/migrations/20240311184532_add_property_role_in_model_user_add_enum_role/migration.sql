/*
  Warnings:

  - You are about to drop the column `anonimId` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Anonim` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ANOMIM', 'USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_anonimId_fkey";

-- DropIndex
DROP INDEX "Basket_anonimId_key";

-- DropIndex
DROP INDEX "User_sessionId_key";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "anonimId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sessionId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ANOMIM',
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "profileImage" DROP NOT NULL;

-- DropTable
DROP TABLE "Anonim";
