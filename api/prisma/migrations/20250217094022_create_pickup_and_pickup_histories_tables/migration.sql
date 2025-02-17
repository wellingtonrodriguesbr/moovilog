-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('PENDING', 'IN_ROUTE', 'COLLECTED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PickupPriority" AS ENUM ('NORMAL', 'URGENT');

-- CreateEnum
CREATE TYPE "NonPickupReason" AS ENUM ('CUSTOMER_ABSENT', 'WRONG_ADDRESS', 'ACCESS_RESTRICTED', 'REFUSED_BY_CUSTOMER', 'WEATHER_CONDITIONS', 'OTHER');

-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_creator_id_fkey";

-- AlterTable
ALTER TABLE "freights" ALTER COLUMN "creator_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "pickups" (
    "id" TEXT NOT NULL,
    "pickup_number" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "weight" DECIMAL(10,2) NOT NULL,
    "volume_quantity" INTEGER NOT NULL,
    "cubage" DECIMAL(10,2),
    "status" "PickupStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "PickupPriority" NOT NULL DEFAULT 'NORMAL',
    "observation" TEXT,
    "non_pickup_reason" "NonPickupReason",
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "collected_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL,
    "freight_id" TEXT,
    "company_id" TEXT NOT NULL,
    "creator_id" TEXT,
    "assigned_driver_id" TEXT,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "pickups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_histories" (
    "id" TEXT NOT NULL,
    "status" "PickupStatus" NOT NULL,
    "non_pickup_reason" "NonPickupReason",
    "attempt_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,
    "pickup_id" TEXT NOT NULL,
    "driver_id" TEXT,

    CONSTRAINT "pickup_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pickups_pickup_number_key" ON "pickups"("pickup_number");

-- CreateIndex
CREATE INDEX "pickups_pickup_number_idx" ON "pickups"("pickup_number");

-- CreateIndex
CREATE INDEX "pickups_status_idx" ON "pickups"("status");

-- CreateIndex
CREATE INDEX "pickup_histories_pickup_id_idx" ON "pickup_histories"("pickup_id");

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_assigned_driver_id_fkey" FOREIGN KEY ("assigned_driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_pickup_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "pickups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
