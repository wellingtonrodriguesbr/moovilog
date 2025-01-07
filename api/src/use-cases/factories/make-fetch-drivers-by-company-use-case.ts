import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { FetchDriversByCompanyUseCase } from "@/use-cases/fetch-drivers-by-company-use-case";

export function makeFetchDriversByCompanyUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchDriversByCompanyUseCase = new FetchDriversByCompanyUseCase(
		driversRepository,
		companiesRepository,
		companyMembersRepository
	);

	return fetchDriversByCompanyUseCase;
}
