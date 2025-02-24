import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFinanceTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-finance-transactions-repository";
import { PrismaFinanceCategoriesRepository } from "@/modules/financial/repositories/prisma/prisma-finance-categories-repository";
import { RegisterTransactionUseCase } from "@/modules/financial/use-cases/register-transaction-use-case";
import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaDriverTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-driver-transactions-repository";
import { PermissionService } from "@/services/permission-service";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";

export function makeRegisterTransactionUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const driversRepository = new PrismaDriversRepository();
	const driverTransactionsRepository = new PrismaDriverTransactionsRepository();
	const financeTransactionsRepository =
		new PrismaFinanceTransactionsRepository();
	const financeCategoriesRepository = new PrismaFinanceCategoriesRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const registerTransactionUseCase = new RegisterTransactionUseCase(
		companyMembersRepository,
		companiesRepository,
		driversRepository,
		driverTransactionsRepository,
		financeTransactionsRepository,
		financeCategoriesRepository,
		permissionService
	);

	return registerTransactionUseCase;
}
