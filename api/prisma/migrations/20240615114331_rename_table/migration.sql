/*
  Warnings:

  - You are about to drop the `bank_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_data" DROP CONSTRAINT "bank_data_driver_id_fkey";

-- DropTable
DROP TABLE "bank_data";

-- CreateTable
CREATE TABLE "bank_details" (
    "id" TEXT NOT NULL,
    "financial_institution" TEXT NOT NULL,
    "account_type" "AccountTypeOfBankDetails" NOT NULL,
    "agency" INTEGER NOT NULL,
    "account_number" INTEGER NOT NULL,
    "pix_key" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "driver_id" TEXT NOT NULL,

    CONSTRAINT "bank_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_details" ADD CONSTRAINT "bank_details_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
