/*
  Warnings:

  - You are about to drop the column `role` on the `company_members` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ADMIN', 'MANAGE_SHIPMENTS_AND_PICKUPS', 'VIEW_SHIPMENTS_AND_PICKUPS', 'MANAGE_VEHICLES_AND_DRIVERS', 'VIEW_VEHICLES_AND_DRIVERS', 'MANAGE_ROUTES', 'VIEW_ROUTES', 'MANAGE_RESOURCES_AND_SUPPLIES', 'VIEW_RESOURCES_AND_SUPPLIES', 'MANAGE_NOTICES', 'VIEW_NOTICES', 'MANAGE_DAILY_SCHEDULE', 'VIEW_DAILY_SCHEDULE', 'MANAGE_USERS', 'MANAGE_FINANCES', 'VIEW_FINANCES', 'MANAGE_REPORTS', 'VIEW_REPORTS', 'MANAGE_SETTINGS', 'MANAGE_PERMISSIONS');

-- AlterTable
ALTER TABLE "company_members" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "company_member_permissions" (
    "id" TEXT NOT NULL,
    "permission" "UserPermission" NOT NULL,
    "company_member_id" TEXT NOT NULL,

    CONSTRAINT "company_member_permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_member_permissions" ADD CONSTRAINT "company_member_permissions_company_member_id_fkey" FOREIGN KEY ("company_member_id") REFERENCES "company_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
