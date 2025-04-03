import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { UpdateVehicleUseCase } from "@/modules/vehicle/use-cases/update-vehicle-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateVehicleUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();

	const permissionService = new PermissionService(companyMembersRepository);

	const updateVehicleUseCase = new UpdateVehicleUseCase(
		companyMembersRepository,
		vehiclesRepository,
		permissionService
	);

	return updateVehicleUseCase;
}
