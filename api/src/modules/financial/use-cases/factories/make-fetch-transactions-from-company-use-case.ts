import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFinanceTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-finance-transactions-repository";
import { FetchTransactionsFromCompanyUseCase } from "@/modules/financial/use-cases/fetch-transactions-from-company-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeFetchTransactionsFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const financeTransactionsRepository =
		new PrismaFinanceTransactionsRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const fetchTransactionsFromCompanyUseCase =
		new FetchTransactionsFromCompanyUseCase(
			companyMembersRepository,
			companiesRepository,
			financeTransactionsRepository,
			permissionService
		);

	return fetchTransactionsFromCompanyUseCase;
}
