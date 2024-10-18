/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "companies_address_id_key" ON "companies"("address_id");
