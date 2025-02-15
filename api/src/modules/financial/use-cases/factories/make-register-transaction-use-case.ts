import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFinanceTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-finance-transactions-repository";
import { PrismaFinanceCategoriesRepository } from "@/modules/financial/repositories/prisma/prisma-finance-categories-repository";
import { RegisterTransactionUseCase } from "@/modules/financial/use-cases/register-transaction-use-case";

export function makeRegisterTransactionUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const financeTransactionsRepository =
		new PrismaFinanceTransactionsRepository();
	const financeCategoriesRepository = new PrismaFinanceCategoriesRepository();

	const registerTransactionUseCase = new RegisterTransactionUseCase(
		companyMembersRepository,
		companiesRepository,
		financeTransactionsRepository,
		financeCategoriesRepository
	);

	return registerTransactionUseCase;
}
