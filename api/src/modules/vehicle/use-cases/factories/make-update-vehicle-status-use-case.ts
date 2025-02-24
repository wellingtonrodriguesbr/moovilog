import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { UpdateVehicleStatusUseCase } from "@/modules/vehicle/use-cases/update-vehicle-status-use-case";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateVehicleStatusUseCase() {
	const vehiclesRepository = new PrismaVehiclesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const updateVehicleStatusUseCase = new UpdateVehicleStatusUseCase(
		companyMembersRepository,
		companiesRepository,
		vehiclesRepository,
		permissionService
	);

	return updateVehicleStatusUseCase;
}
