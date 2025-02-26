import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { UpdateVehicleUseCase } from "@/modules/vehicle/use-cases/update-vehicle-use-case";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateVehicleUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const updateVehicleUseCase = new UpdateVehicleUseCase(
		companyMembersRepository,
		vehiclesRepository,
		permissionService
	);

	return updateVehicleUseCase;
}
