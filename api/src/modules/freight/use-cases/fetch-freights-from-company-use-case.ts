import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { IFreight } from "@/modules/shared/interfaces/freight";

interface FetchFreightsFromCompanyUseCaseRequest {
	userId: string;
}

interface FetchFreightsFromCompanyUseCaseResponse {
	freights: IFreight[];
}

export class FetchFreightsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private freightsRepository: FreightsRepository
	) {}

	async execute({
		userId,
	}: FetchFreightsFromCompanyUseCaseRequest): Promise<FetchFreightsFromCompanyUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError();
		}

		const freights = await this.freightsRepository.findManyByCompanyId(
			member.companyId
		);

		return { freights };
	}
}
