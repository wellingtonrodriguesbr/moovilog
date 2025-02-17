import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IFreight } from "@/modules/freight/interfaces/freight";

interface GetFreightDetailsUseCaseRequest {
	userId: string;
	companyId: string;
	freightId: string;
}

interface GetFreightDetailsUseCaseResponse {
	freight: IFreight;
}

export class GetFreightDetailsUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private freightsRepository: FreightsRepository
	) {}

	async execute({
		userId,
		companyId,
		freightId,
	}: GetFreightDetailsUseCaseRequest): Promise<GetFreightDetailsUseCaseResponse> {
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

		const freight = await this.freightsRepository.findById(freightId);

		if (!freight) {
			throw new ResourceNotFoundError("Freight not found");
		}

		return { freight };
	}
}
