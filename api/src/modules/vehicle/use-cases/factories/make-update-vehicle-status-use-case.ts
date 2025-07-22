import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { UpdateVehicleStatusUseCase } from "@/modules/vehicle/use-cases/update-vehicle-status-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateVehicleStatusUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository();
  const companyMembersRepository = new PrismaCompanyMembersRepository();

  const permissionService = new PermissionService(companyMembersRepository);

  const updateVehicleStatusUseCase = new UpdateVehicleStatusUseCase(
    companyMembersRepository,
    vehiclesRepository,
    permissionService
  );

  return updateVehicleStatusUseCase;
}
