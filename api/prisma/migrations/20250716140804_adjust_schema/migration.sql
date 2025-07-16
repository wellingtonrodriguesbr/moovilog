/*
  Warnings:

  - You are about to drop the column `created_at` on the `driver_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `driver_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `freight_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `freight_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pickup_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pickup_transactions` table. All the data in the column will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[route_id,city_id]` on the table `cities_in_route` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driver_id,finance_transaction_id]` on the table `driver_transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[freight_id,finance_transaction_id]` on the table `freight_transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pickup_id,finance_transaction_id]` on the table `pickup_transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_user_id_fkey";

-- DropIndex
DROP INDEX "cities_state_id_idx";

-- DropIndex
DROP INDEX "company_members_user_id_idx";

-- DropIndex
DROP INDEX "drivers_created_at_idx";

-- DropIndex
DROP INDEX "finance_transactions_category_id_idx";

-- DropIndex
DROP INDEX "finance_transactions_creator_id_idx";

-- DropIndex
DROP INDEX "finance_transactions_payment_method_idx";

-- DropIndex
DROP INDEX "freights_creator_id_idx";

-- DropIndex
DROP INDEX "freights_driver_id_idx";

-- DropIndex
DROP INDEX "freights_modality_idx";

-- DropIndex
DROP INDEX "freights_route_id_idx";

-- DropIndex
DROP INDEX "freights_vehicle_id_idx";

-- DropIndex
DROP INDEX "pickup_histories_driver_id_idx";

-- DropIndex
DROP INDEX "pickups_collected_at_idx";

-- DropIndex
DROP INDEX "pickups_creator_id_idx";

-- DropIndex
DROP INDEX "pickups_driver_id_idx";

-- DropIndex
DROP INDEX "pickups_freight_id_idx";

-- DropIndex
DROP INDEX "pickups_pickup_number_idx";

-- DropIndex
DROP INDEX "pickups_recipient_name_idx";

-- DropIndex
DROP INDEX "pickups_requested_at_idx";

-- DropIndex
DROP INDEX "pickups_sender_name_idx";

-- DropIndex
DROP INDEX "vehicles_body_idx";

-- DropIndex
DROP INDEX "vehicles_brand_idx";

-- DropIndex
DROP INDEX "vehicles_created_at_idx";

-- DropIndex
DROP INDEX "vehicles_model_idx";

-- DropIndex
DROP INDEX "vehicles_type_idx";

-- DropIndex
DROP INDEX "vehicles_year_idx";

-- AlterTable
ALTER TABLE "driver_transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "finance_transactions" ADD COLUMN     "paid_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "freight_transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "pickup_transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "pickups" ALTER COLUMN "requested_at" DROP NOT NULL,
ALTER COLUMN "requested_at" DROP DEFAULT;

-- DropTable
DROP TABLE "token";

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_code_key" ON "tokens"("code");

-- CreateIndex
CREATE INDEX "tokens_type_idx" ON "tokens"("type");

-- CreateIndex
CREATE INDEX "addresses_zip_code_idx" ON "addresses"("zip_code");

-- CreateIndex
CREATE UNIQUE INDEX "cities_in_route_route_id_city_id_key" ON "cities_in_route"("route_id", "city_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_transactions_driver_id_finance_transaction_id_key" ON "driver_transactions"("driver_id", "finance_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "freight_transactions_freight_id_finance_transaction_id_key" ON "freight_transactions"("freight_id", "finance_transaction_id");

-- CreateIndex
CREATE INDEX "freights_driver_id_vehicle_id_idx" ON "freights"("driver_id", "vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "pickup_transactions_pickup_id_finance_transaction_id_key" ON "pickup_transactions"("pickup_id", "finance_transaction_id");

-- CreateIndex
CREATE INDEX "pickups_sender_name_recipient_name_idx" ON "pickups"("sender_name", "recipient_name");

-- CreateIndex
CREATE INDEX "vehicles_brand_model_idx" ON "vehicles"("brand", "model");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
