import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

const ROLE_PERMISSIONS = ["FINANCIAL", "MANAGER", "ADMIN"];

interface GetFinancialSummaryFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface GetFinancialSummaryFromCompanyUseCaseResponse {
	totalTransactions: number;
	totalIncomeInCents: number;
	totalExpenseInCents: number;
	summary: number;
	percentage: number;
}

export class GetFinancialSummaryFromCompanyUseCase {
	constructor(
		private financeTransactionsRepository: FinanceTransactionsRepository,
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		userId,
		companyId,
	}: GetFinancialSummaryFromCompanyUseCaseRequest): Promise<GetFinancialSummaryFromCompanyUseCaseResponse> {
		const [memberInCompany, company] = await Promise.all([
			this.companyMembersRepository.findMemberInCompany(userId, companyId),
			this.companiesRepository.findById(companyId),
		]);

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!ROLE_PERMISSIONS.includes(memberInCompany.role)) {
			throw new NotAllowedError(
				"You do not have permission to access this data"
			);
		}

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

		const summary = totalIncomeInCents - totalExpenseInCents;

		const percentage =
			totalIncomeInCents !== 0
				? (summary / totalIncomeInCents) * 100
				: summary < 0
					? -100
					: 0;

		return {
			totalTransactions,
			totalIncomeInCents,
			totalExpenseInCents,
			summary,
			percentage: Math.round(percentage),
		};
	}
}
