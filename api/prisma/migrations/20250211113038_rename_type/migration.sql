/*
  Warnings:

  - Changed the type of `type` on the `finance_transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FinanceTransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "finance_transactions" DROP COLUMN "type",
ADD COLUMN     "type" "FinanceTransactionType" NOT NULL;

-- DropEnum
DROP TYPE "FinanceCategoryType";
