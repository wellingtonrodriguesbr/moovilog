/*
  Warnings:

  - A unique constraint covering the columns `[phone,company_id]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "drivers_phone_company_id_key" ON "drivers"("phone", "company_id");
