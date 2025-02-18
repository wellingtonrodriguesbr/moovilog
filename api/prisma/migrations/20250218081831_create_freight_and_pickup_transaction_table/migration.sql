-- CreateTable
CREATE TABLE "freight_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "freight_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "freight_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pickup_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "pickup_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "freight_transactions" ADD CONSTRAINT "freight_transactions_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_transactions" ADD CONSTRAINT "freight_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_transactions" ADD CONSTRAINT "pickup_transactions_pickup_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "pickups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_transactions" ADD CONSTRAINT "pickup_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
