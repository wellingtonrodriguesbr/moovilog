/*
  Warnings:

  - The values [PARTIAL,FULL,MULTIMODAL,CONSOLIDATED,INTERMODAL] on the enum `FreightType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FreightType_new" AS ENUM ('FRACTIONAL', 'DEDICATED', 'EXPRESS', 'TRANSFER');
ALTER TABLE "freights" ALTER COLUMN "type" TYPE "FreightType_new" USING ("type"::text::"FreightType_new");
ALTER TYPE "FreightType" RENAME TO "FreightType_old";
ALTER TYPE "FreightType_new" RENAME TO "FreightType";
DROP TYPE "FreightType_old";
COMMIT;
