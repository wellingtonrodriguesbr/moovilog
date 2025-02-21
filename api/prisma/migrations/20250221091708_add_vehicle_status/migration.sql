-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE', 'RESERVED', 'BROKEN');

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE';
