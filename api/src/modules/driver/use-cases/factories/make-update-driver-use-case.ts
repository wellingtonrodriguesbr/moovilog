import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { UpdateDriverUseCase } from "@/modules/driver/use-cases/update-driver-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeUpdateDriverUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();

	const permissionService = new PermissionService(companyMembersRepository);

	const updateDriverUseCase = new UpdateDriverUseCase(
		companyMembersRepository,
		driversRepository,
		permissionService
	);

	return updateDriverUseCase;
}
