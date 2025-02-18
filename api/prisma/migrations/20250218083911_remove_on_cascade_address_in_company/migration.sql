-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_address_id_fkey";

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
