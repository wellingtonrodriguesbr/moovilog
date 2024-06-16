/*
  Warnings:

  - You are about to alter the column `freight_amount_in_cents` on the `freights` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "freights" ALTER COLUMN "freight_amount_in_cents" SET DATA TYPE INTEGER;
