/*
  Warnings:

  - A unique constraint covering the columns `[company_id,member_id]` on the table `company_members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_members_company_id_member_id_key" ON "company_members"("company_id", "member_id");
