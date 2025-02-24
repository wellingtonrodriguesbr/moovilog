import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IFreight } from "@/modules/freight/interfaces/freight";
import { PermissionService } from "@/services/permission-service";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

interface FetchFreightsFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchFreightsFromCompanyUseCaseResponse {
	freights: IFreight[];
	summary: {
		totalFreights: number;
		totalDeliveries: number;
		totalWeightOfDeliveries: number;
		totalPickups: number;
		totalWeightOfPickups: number;
		totalFreightAmountInCents: number;
	};
}

export class FetchFreightsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private freightsRepository: FreightsRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		userId,
		companyId,
	}: FetchFreightsFromCompanyUseCaseRequest): Promise<FetchFreightsFromCompanyUseCaseResponse> {
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
			["ADMIN", "VIEW_SHIPMENTS_AND_PICKUPS"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
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
				acc.totalFreightAmountInCents += freight.freightAmountInCents;

				return acc;
			},
			{
				totalFreights: 0,
				totalDeliveries: 0,
				totalWeightOfDeliveries: 0,
				totalPickups: 0,
				totalWeightOfPickups: 0,
				totalFreightAmountInCents: 0,
			}
		);

		return { freights, summary };
	}
}
