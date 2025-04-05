-- AlterTable
ALTER TABLE "pickup_histories" ADD COLUMN     "creator_id" TEXT;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
