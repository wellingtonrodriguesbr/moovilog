/*
  Warnings:

  - A unique constraint covering the columns `[trailer_plate,company_id]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vehicles_trailer_plate_company_id_key" ON "vehicles"("trailer_plate", "company_id");
