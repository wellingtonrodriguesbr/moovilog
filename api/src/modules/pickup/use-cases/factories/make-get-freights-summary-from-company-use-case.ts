import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { GetFreightsSummaryFromCompanyUseCase } from "@/modules/freight/use-cases/get-freights-summary-from-company-use-case";

export function makeGetFreightsSummaryFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const freightsRepository = new PrismaFreightsRepository();

	const getFreightsSummaryFromCompanyUseCase =
		new GetFreightsSummaryFromCompanyUseCase(
			freightsRepository,
			companyMembersRepository,
			companiesRepository
		);

	return getFreightsSummaryFromCompanyUseCase;
}
