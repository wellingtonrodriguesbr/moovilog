/*
  Warnings:

  - The values [PASSWORD_RECOVER] on the enum `TokenType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[pickup_number,company_id]` on the table `pickups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TokenType_new" AS ENUM ('RECOVER_PASSWORD', 'AUTH_LINK');
ALTER TABLE "token" ALTER COLUMN "type" TYPE "TokenType_new" USING ("type"::text::"TokenType_new");
ALTER TYPE "TokenType" RENAME TO "TokenType_old";
ALTER TYPE "TokenType_new" RENAME TO "TokenType";
DROP TYPE "TokenType_old";
COMMIT;

-- DropIndex
DROP INDEX "pickups_pickup_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "pickups_pickup_number_company_id_key" ON "pickups"("pickup_number", "company_id");
