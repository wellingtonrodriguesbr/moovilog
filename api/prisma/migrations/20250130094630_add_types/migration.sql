/*
  Warnings:

  - The values [TANDEM_AXLE_TRUCK] on the enum `VehicleCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VehicleBody" ADD VALUE 'TANK';
ALTER TYPE "VehicleBody" ADD VALUE 'BULK_CARRIER';
ALTER TYPE "VehicleBody" ADD VALUE 'LIVESTOCK';
ALTER TYPE "VehicleBody" ADD VALUE 'FLATBED';
ALTER TYPE "VehicleBody" ADD VALUE 'CONTAINER';
ALTER TYPE "VehicleBody" ADD VALUE 'WOOD';
ALTER TYPE "VehicleBody" ADD VALUE 'CAR_CARRIER';

-- AlterEnum
BEGIN;
CREATE TYPE "VehicleCategory_new" AS ENUM ('UTILITY', 'VAN', 'LIGHT_TRUCKS', 'STRAIGHT_TRUCKS', 'TRUCKS', 'QUAD_AXLE_TRUCKS', 'SEMI_TRAILER', 'B_TRAIN', 'ROAD_TRAIN');
ALTER TABLE "vehicles" ALTER COLUMN "category" TYPE "VehicleCategory_new" USING ("category"::text::"VehicleCategory_new");
ALTER TYPE "VehicleCategory" RENAME TO "VehicleCategory_old";
ALTER TYPE "VehicleCategory_new" RENAME TO "VehicleCategory";
DROP TYPE "VehicleCategory_old";
COMMIT;
