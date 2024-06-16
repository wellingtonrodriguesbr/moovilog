-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_city_id_fkey";

-- DropForeignKey
ALTER TABLE "areas_by_state" DROP CONSTRAINT "areas_by_state_area_id_fkey";

-- DropForeignKey
ALTER TABLE "areas_by_state" DROP CONSTRAINT "areas_by_state_state_id_fkey";

-- DropForeignKey
ALTER TABLE "bank_details" DROP CONSTRAINT "bank_details_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_state_id_fkey";

-- DropForeignKey
ALTER TABLE "cities_by_area" DROP CONSTRAINT "cities_by_area_area_id_fkey";

-- DropForeignKey
ALTER TABLE "cities_by_area" DROP CONSTRAINT "cities_by_area_city_id_fkey";

-- DropForeignKey
ALTER TABLE "cities_by_freight" DROP CONSTRAINT "cities_by_freight_city_id_fkey";

-- DropForeignKey
ALTER TABLE "cities_by_freight" DROP CONSTRAINT "cities_by_freight_freight_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "company_address" DROP CONSTRAINT "company_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "company_address" DROP CONSTRAINT "company_address_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_drivers" DROP CONSTRAINT "company_drivers_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_drivers" DROP CONSTRAINT "company_drivers_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "company_members" DROP CONSTRAINT "company_members_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_members" DROP CONSTRAINT "company_members_member_id_fkey";

-- DropForeignKey
ALTER TABLE "company_service_areas" DROP CONSTRAINT "company_service_areas_area_id_fkey";

-- DropForeignKey
ALTER TABLE "company_service_areas" DROP CONSTRAINT "company_service_areas_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_service_cities" DROP CONSTRAINT "company_service_cities_city_id_fkey";

-- DropForeignKey
ALTER TABLE "company_service_cities" DROP CONSTRAINT "company_service_cities_company_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_address" DROP CONSTRAINT "driver_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_address" DROP CONSTRAINT "driver_address_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_company_id_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "freight_information" DROP CONSTRAINT "freight_information_freight_id_fkey";

-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "freights_by_company" DROP CONSTRAINT "freights_by_company_company_id_fkey";

-- DropForeignKey
ALTER TABLE "freights_by_company" DROP CONSTRAINT "freights_by_company_freight_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_driver_id_fkey";

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_service_areas" ADD CONSTRAINT "company_service_areas_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_service_areas" ADD CONSTRAINT "company_service_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_service_cities" ADD CONSTRAINT "company_service_cities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_service_cities" ADD CONSTRAINT "company_service_cities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_drivers" ADD CONSTRAINT "company_drivers_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_drivers" ADD CONSTRAINT "company_drivers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_details" ADD CONSTRAINT "bank_details_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights_by_company" ADD CONSTRAINT "freights_by_company_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights_by_company" ADD CONSTRAINT "freights_by_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_information" ADD CONSTRAINT "freight_information_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_by_freight" ADD CONSTRAINT "cities_by_freight_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_by_freight" ADD CONSTRAINT "cities_by_freight_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas_by_state" ADD CONSTRAINT "areas_by_state_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas_by_state" ADD CONSTRAINT "areas_by_state_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_by_area" ADD CONSTRAINT "cities_by_area_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_by_area" ADD CONSTRAINT "cities_by_area_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_address" ADD CONSTRAINT "driver_address_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_address" ADD CONSTRAINT "driver_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
