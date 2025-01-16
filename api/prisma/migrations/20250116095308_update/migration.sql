/*
  Warnings:

  - You are about to drop the column `attends_all_states` on the `companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id,state_id,area_id]` on the table `company_states_areas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `company_states_areas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "attends_all_states";

-- AlterTable
ALTER TABLE "company_states_areas" ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_states_areas_company_id_state_id_area_id_key" ON "company_states_areas"("company_id", "state_id", "area_id");

-- AddForeignKey
ALTER TABLE "company_states_areas" ADD CONSTRAINT "company_states_areas_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
