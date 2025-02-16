import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";

const ROLE_PERMISSIONS = ["OPERATIONAL", "MANAGER", "ADMIN"];

interface GetFreightsSummaryFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface GetFreightsSummaryFromCompanyUseCaseResponse {
	summary: {
		totalFreights: number;
		totalDeliveries: number;
		totalWeightOfDeliveries: number;
		totalPickups: number;
		totalWeightOfPickups: number;
		totalFreightsAmount: number;
	};
}

export class GetFreightsSummaryFromCompanyUseCase {
	constructor(
		private freightsRepository: FreightsRepository,
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		userId,
		companyId,
	}: GetFreightsSummaryFromCompanyUseCaseRequest): Promise<GetFreightsSummaryFromCompanyUseCaseResponse> {
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

		const freights =
			await this.freightsRepository.findManyByCompanyId(companyId);

		const summary = freights.reduce(
			(acc, freight) => {
				acc.totalFreights += 1;
				acc.totalDeliveries += freight.deliveriesQuantity;
				acc.totalWeightOfDeliveries += Number(freight.totalWeightOfDeliveries);
				acc.totalPickups += freight.pickupsQuantity ?? 0;
				acc.totalWeightOfPickups += Number(freight.totalWeightOfPickups ?? 0);
				acc.totalFreightsAmount += freight.freightAmountInCents;

				return acc;
			},
			{
				totalFreights: 0,
				totalDeliveries: 0,
				totalWeightOfDeliveries: 0,
				totalPickups: 0,
				totalWeightOfPickups: 0,
				totalFreightsAmount: 0,
			}
		);

		return {
			summary,
		};
	}
}
