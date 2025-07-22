import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { RegisterVehicleUseCase } from "@/modules/vehicle/use-cases/register-vehicle-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterVehicleUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const vehiclesRepository = new PrismaVehiclesRepository();

  const permissionService = new PermissionService(companyMembersRepository);

  const registerVehicleUseCase = new RegisterVehicleUseCase(
    companyMembersRepository,
    vehiclesRepository,
    permissionService
  );

  return registerVehicleUseCase;
}
