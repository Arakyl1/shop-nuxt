/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `Anonim` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Anonim_ip_key" ON "Anonim"("ip");
