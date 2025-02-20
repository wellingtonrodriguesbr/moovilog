import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { DeleteDriverUseCase } from "@/modules/driver/use-cases/delete-driver-use-case";

export function makeDeleteDriverUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const deleteDriverUseCase = new DeleteDriverUseCase(
		companyMembersRepository,
		companiesRepository,
		driversRepository
	);

	return deleteDriverUseCase;
}
