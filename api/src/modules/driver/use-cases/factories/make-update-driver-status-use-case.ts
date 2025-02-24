import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { UpdateDriverStatusUseCase } from "@/modules/driver/use-cases/update-driver-status-use-case";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateDriverStatusUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const updateDriverStatusUseCase = new UpdateDriverStatusUseCase(
		companyMembersRepository,
		companiesRepository,
		driversRepository,
		permissionService
	);

	return updateDriverStatusUseCase;
}
