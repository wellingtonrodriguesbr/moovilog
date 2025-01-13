/*
  Warnings:

  - The values [FRACTIONAL,DIRECT,DEDICATED] on the enum `FreightType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `auth_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVER', 'AUTH_LINK');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FreightModality" ADD VALUE 'FLAT_RATE';
ALTER TYPE "FreightModality" ADD VALUE 'WEIGHT_BASED';
ALTER TYPE "FreightModality" ADD VALUE 'DISTANCE_BASED';
ALTER TYPE "FreightModality" ADD VALUE 'TIME_BASED';
ALTER TYPE "FreightModality" ADD VALUE 'PER_STOP';
ALTER TYPE "FreightModality" ADD VALUE 'ZONE_BASED';

-- AlterEnum
BEGIN;
CREATE TYPE "FreightType_new" AS ENUM ('PARTIAL', 'FULL', 'EXPRESS', 'MULTIMODAL', 'CONSOLIDATED', 'INTERMODAL');
ALTER TABLE "freights" ALTER COLUMN "type" TYPE "FreightType_new" USING ("type"::text::"FreightType_new");
ALTER TYPE "FreightType" RENAME TO "FreightType_old";
ALTER TYPE "FreightType_new" RENAME TO "FreightType";
DROP TYPE "FreightType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "auth_links" DROP CONSTRAINT "auth_links_user_id_fkey";

-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_route_id_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "attends_all_states" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "freights" ADD COLUMN     "city_id" TEXT,
ALTER COLUMN "route_id" DROP NOT NULL;

-- DropTable
DROP TABLE "auth_links";

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_code_key" ON "token"("code");

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
