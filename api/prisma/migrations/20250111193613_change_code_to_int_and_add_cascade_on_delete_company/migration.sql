/*
  Warnings:

  - Changed the type of `code` on the `areas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_company_id_fkey";

-- AlterTable
ALTER TABLE "areas" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "areas_code_key" ON "areas"("code");

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
