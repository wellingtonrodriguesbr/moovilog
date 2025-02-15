import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFinanceTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-finance-transactions-repository";
import { GetFinancialSummaryFromCompanyUseCase } from "@/modules/financial/use-cases/get-financial-summary-from-company-use-case";

export function makeGetFinancialSummaryFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const financeTransactionsRepository =
		new PrismaFinanceTransactionsRepository();

	const getFinancialSummaryFromCompanyUseCase =
		new GetFinancialSummaryFromCompanyUseCase(
			financeTransactionsRepository,
			companyMembersRepository,
			companiesRepository
		);

	return getFinancialSummaryFromCompanyUseCase;
}
