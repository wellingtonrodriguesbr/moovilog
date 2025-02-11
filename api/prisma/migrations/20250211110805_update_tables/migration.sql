/*
  Warnings:

  - You are about to drop the column `type` on the `finance_categories` table. All the data in the column will be lost.
  - Added the required column `type` to the `finance_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finance_categories" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "finance_transactions" ADD COLUMN     "type" "FinanceCategoryType" NOT NULL;
