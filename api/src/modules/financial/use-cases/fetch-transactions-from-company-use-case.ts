import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { IFinanceTransaction } from "@/modules/financial/interfaces/finance-transaction";

interface FetchTransactionsFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchTransactionsFromCompanyUseCaseResponse {
	transactions: IFinanceTransaction[];
}

const ROLE_PERMISSIONS = ["FINANCIAL", "MANAGER", "ADMIN"];

export class FetchTransactionsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private financeTransactionsRepository: FinanceTransactionsRepository
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

		if (!ROLE_PERMISSIONS.includes(memberInCompany.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const transactions =
			await this.financeTransactionsRepository.findManyByCompanyId(companyId);

		return { transactions };
	}
}
