import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { FetchMembersFromCompanyUseCase } from "@/modules/company-member/use-cases/fetch-members-from-company-use-case";

export function makeFetchMembersFromCompanyUseCase() {
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchMembersFromCompanyUseCase = new FetchMembersFromCompanyUseCase(
		companyMembersRepository,
		companiesRepository
	);

	return fetchMembersFromCompanyUseCase;
}
