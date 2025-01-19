import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyStatesAreasRepository } from "@/repositories/company-states-areas-repository";
import { StatesRepository } from "@/repositories/states-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IState } from "@/interfaces/state";

interface FetchStatesFromCompanyUseCaseRequest {
	userId: string;
}

interface FetchStatesFromCompanyUseCaseResponse {
	states: IState[];
}

export class FetchStatesFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private companyStatesAreasRepository: CompanyStatesAreasRepository
	) {}

	async execute({
		userId,
	}: FetchStatesFromCompanyUseCaseRequest): Promise<FetchStatesFromCompanyUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const companyStates =
			await this.companyStatesAreasRepository.findManyByCompanyId(
				member.companyId
			);

		if (!companyStates?.length) {
			throw new ResourceNotFoundError("No states found for the company");
		}

		const states = await this.statesRepository.findManyByIds(
			companyStates.map((state) => state.stateId)
		);

		if (!states?.length) {
			throw new ResourceNotFoundError("No states found for the company");
		}

		return { states };
	}
}
