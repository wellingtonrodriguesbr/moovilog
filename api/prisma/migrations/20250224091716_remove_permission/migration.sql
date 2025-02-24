/*
  Warnings:

  - The values [MANAGE_SETTINGS] on the enum `UserPermission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserPermission_new" AS ENUM ('ADMIN', 'MANAGE_SHIPMENTS_AND_PICKUPS', 'VIEW_SHIPMENTS_AND_PICKUPS', 'MANAGE_VEHICLES_AND_DRIVERS', 'VIEW_VEHICLES_AND_DRIVERS', 'MANAGE_ROUTES', 'VIEW_ROUTES', 'MANAGE_RESOURCES_AND_SUPPLIES', 'VIEW_RESOURCES_AND_SUPPLIES', 'MANAGE_NOTICES', 'VIEW_NOTICES', 'MANAGE_DAILY_SCHEDULE', 'VIEW_DAILY_SCHEDULE', 'MANAGE_USERS', 'MANAGE_FINANCES', 'VIEW_FINANCES', 'MANAGE_REPORTS', 'VIEW_REPORTS', 'MANAGE_PERMISSIONS');
ALTER TABLE "company_member_permissions" ALTER COLUMN "permission" TYPE "UserPermission_new" USING ("permission"::text::"UserPermission_new");
ALTER TYPE "UserPermission" RENAME TO "UserPermission_old";
ALTER TYPE "UserPermission_new" RENAME TO "UserPermission";
DROP TYPE "UserPermission_old";
COMMIT;
