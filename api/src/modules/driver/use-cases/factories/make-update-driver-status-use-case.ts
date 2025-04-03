import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { UpdateDriverStatusUseCase } from "@/modules/driver/use-cases/update-driver-status-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateDriverStatusUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();

	const permissionService = new PermissionService(companyMembersRepository);

	const updateDriverStatusUseCase = new UpdateDriverStatusUseCase(
		companyMembersRepository,
		driversRepository,
		permissionService
	);

	return updateDriverStatusUseCase;
}
