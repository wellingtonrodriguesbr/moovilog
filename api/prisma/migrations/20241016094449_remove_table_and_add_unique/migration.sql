/*
  Warnings:

  - You are about to drop the `bank_details` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[document_number,company_id]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plate,company_id]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "company_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "bank_details";

-- CreateIndex
CREATE UNIQUE INDEX "drivers_document_number_company_id_key" ON "drivers"("document_number", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_company_id_key" ON "vehicles"("plate", "company_id");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
