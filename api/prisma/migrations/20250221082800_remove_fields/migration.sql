/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `freights` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_city_id_fkey";

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "freights" DROP COLUMN "city_id";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "deleted_at";
