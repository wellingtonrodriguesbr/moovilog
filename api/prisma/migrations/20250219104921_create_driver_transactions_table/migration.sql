-- CreateTable
CREATE TABLE "driver_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "driver_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "driver_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "driver_transactions" ADD CONSTRAINT "driver_transactions_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_transactions" ADD CONSTRAINT "driver_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
