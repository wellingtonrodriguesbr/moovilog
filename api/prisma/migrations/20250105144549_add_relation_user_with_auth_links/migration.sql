/*
  Warnings:

  - Added the required column `user_id` to the `auth_links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth_links" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AccountTypeOfBankDetails";

-- AddForeignKey
ALTER TABLE "auth_links" ADD CONSTRAINT "auth_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
