/*
  Warnings:

  - You are about to drop the column `assigned_driver_id` on the `pickups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pickups" DROP CONSTRAINT "pickups_assigned_driver_id_fkey";

-- DropIndex
DROP INDEX "pickups_assigned_driver_id_idx";

-- AlterTable
ALTER TABLE "pickup_histories" ADD COLUMN     "vehicle_id" TEXT;

-- AlterTable
ALTER TABLE "pickups" DROP COLUMN "assigned_driver_id",
ADD COLUMN     "driver_id" TEXT,
ADD COLUMN     "vehicle_id" TEXT;

-- CreateIndex
CREATE INDEX "pickups_driver_id_idx" ON "pickups"("driver_id");

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
