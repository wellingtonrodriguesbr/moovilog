import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { RegisterDriverUseCase } from "@/modules/driver/use-cases/register-driver-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterDriverUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();

	const permissionService = new PermissionService(companyMembersRepository);

	const registerDriverUseCase = new RegisterDriverUseCase(
		companyMembersRepository,
		driversRepository,
		permissionService
	);

	return registerDriverUseCase;
}
