/*
  Warnings:

  - Added the required column `route_id` to the `freights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "freights" ADD COLUMN     "route_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
