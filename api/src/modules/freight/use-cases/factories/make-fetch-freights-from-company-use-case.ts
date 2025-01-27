import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { FetchFreightsFromCompanyUseCase } from "@/modules/freight/use-cases/fetch-freights-from-company-use-case";

export function makeFetchFreightsFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const freightsRepository = new PrismaFreightsRepository();

	const fetchFreightsFromCompanyUseCase = new FetchFreightsFromCompanyUseCase(
		companyMembersRepository,
		companiesRepository,
		freightsRepository
	);

	return fetchFreightsFromCompanyUseCase;
}
