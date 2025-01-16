-- DropForeignKey
ALTER TABLE "company_states_areas" DROP CONSTRAINT "company_states_areas_company_id_fkey";

-- AddForeignKey
ALTER TABLE "company_states_areas" ADD CONSTRAINT "company_states_areas_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
