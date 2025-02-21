import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { UpdateDriverStatusUseCase } from "@/modules/driver/use-cases/update-driver-status-use-case";

export function makeUpdateDriverStatusUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const updateDriverStatusUseCase = new UpdateDriverStatusUseCase(
		companyMembersRepository,
		companiesRepository,
		driversRepository
	);

	return updateDriverStatusUseCase;
}
