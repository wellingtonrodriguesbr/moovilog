/*
  Warnings:

  - Changed the type of `full_load_capacity` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "full_load_capacity",
ADD COLUMN     "full_load_capacity" INTEGER NOT NULL;
