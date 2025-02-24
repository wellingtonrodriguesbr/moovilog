import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { IFinanceTransaction } from "@/modules/financial/interfaces/finance-transaction";
import { PermissionService } from "@/services/permission-service";

interface FetchTransactionsFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchTransactionsFromCompanyUseCaseResponse {
	transactions: IFinanceTransaction[];
	totalTransactions: number;
	totalIncomeInCents: number;
	totalExpenseInCents: number;
	totalBalanceInCents: number;
	percentage: number;
}

export class FetchTransactionsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private financeTransactionsRepository: FinanceTransactionsRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		userId,
		companyId,
	}: FetchTransactionsFromCompanyUseCaseRequest): Promise<FetchTransactionsFromCompanyUseCaseResponse> {
		const [company, memberInCompany] = await Promise.all([
			this.companiesRepository.findById(companyId),
			this.companyMembersRepository.findMemberInCompany(userId, companyId),
		]);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		const hasPermission = await this.permissionService.hasPermission(
			memberInCompany.id,
			["ADMIN", "VIEW_FINANCES"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const transactions =
			await this.financeTransactionsRepository.findManyByCompanyId(companyId);

		const totalTransactions =
			await this.financeTransactionsRepository.countByCompanyId(companyId);

		const totalIncomeInCents =
			await this.financeTransactionsRepository.sumByTypeAndCompanyId(
				"INCOME",
				companyId
			);

		const totalExpenseInCents =
			await this.financeTransactionsRepository.sumByTypeAndCompanyId(
				"EXPENSE",
				companyId
			);

		const totalBalanceInCents = totalIncomeInCents - totalExpenseInCents;

		const percentage =
			totalIncomeInCents !== 0
				? (totalBalanceInCents / totalIncomeInCents) * 100
				: totalBalanceInCents < 0
					? -100
					: 0;

		return {
			transactions,
			totalTransactions,
			totalIncomeInCents,
			totalExpenseInCents,
			totalBalanceInCents,
			percentage,
		};
	}
}
