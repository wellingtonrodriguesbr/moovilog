/*
  Warnings:

  - You are about to drop the `day_of_freight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "day_of_freight" DROP CONSTRAINT "day_of_freight_city_id_fkey";

-- DropForeignKey
ALTER TABLE "day_of_freight" DROP CONSTRAINT "day_of_freight_freight_id_fkey";

-- DropTable
DROP TABLE "day_of_freight";

-- CreateTable
CREATE TABLE "cities_by_freight" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "freight_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "cities_by_freight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cities_by_freight" ADD CONSTRAINT "cities_by_freight_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_by_freight" ADD CONSTRAINT "cities_by_freight_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
