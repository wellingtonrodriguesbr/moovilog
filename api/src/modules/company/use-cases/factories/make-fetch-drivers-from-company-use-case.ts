import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { FetchDriversFromCompanyUseCase } from "@/modules/company/use-cases/fetch-drivers-from-company-use-case";

export function makeFetchDriversFromCompanyUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchDriversFromCompanyUseCase = new FetchDriversFromCompanyUseCase(
		driversRepository,
		companiesRepository,
		companyMembersRepository
	);

	return fetchDriversFromCompanyUseCase;
}
