import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IFreight } from "@/modules/shared/interfaces/freight";

interface FetchFreightsFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchFreightsFromCompanyUseCaseResponse {
	freights: IFreight[];
}

export class FetchFreightsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private freightsRepository: FreightsRepository
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

		const freights =
			await this.freightsRepository.findManyByCompanyId(companyId);

		return { freights };
	}
}
