/*
  Warnings:

  - You are about to drop the column `extraData` on the `company_members` table. All the data in the column will be lost.
  - You are about to drop the column `last_updated_at` on the `pickups` table. All the data in the column will be lost.
  - You are about to drop the column `non_pickup_reason` on the `pickups` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `pickups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_members" DROP COLUMN "extraData",
ADD COLUMN     "extra_data" JSONB;

-- AlterTable
ALTER TABLE "pickups" DROP COLUMN "last_updated_at",
DROP COLUMN "non_pickup_reason",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
