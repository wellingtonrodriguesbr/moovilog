/*
  Warnings:

  - A unique constraint covering the columns `[trailer_plate]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "trailer_plate" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_trailer_plate_key" ON "vehicles"("trailer_plate");
