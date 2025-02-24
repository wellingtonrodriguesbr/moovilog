import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { RegisterVehicleUseCase } from "@/modules/vehicle/use-cases/register-vehicle-use-case";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterVehicleUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const registerVehicleUseCase = new RegisterVehicleUseCase(
		companyMembersRepository,
		vehiclesRepository,
		permissionService
	);

	return registerVehicleUseCase;
}
