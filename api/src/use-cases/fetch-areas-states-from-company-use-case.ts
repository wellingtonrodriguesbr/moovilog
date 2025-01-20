import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyStatesAreasRepository } from "@/repositories/company-states-areas-repository";
import { StatesRepository } from "@/repositories/states-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IState } from "@/interfaces/state";
import { IArea } from "@/interfaces/area";
import { AreasRepository } from "@/repositories/areas-repository";

interface FetchAreasStatesFromCompanyUseCaseRequest {
	userId: string;
}

interface FetchAreasStatesFromCompanyUseCaseResponse {
	states: IState[];
	areas: IArea[];
}

export class FetchAreasStatesFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository,
		private companyStatesAreasRepository: CompanyStatesAreasRepository
	) {}

	async execute({
		userId,
	}: FetchAreasStatesFromCompanyUseCaseRequest): Promise<FetchAreasStatesFromCompanyUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const companyAreasStates =
			await this.companyStatesAreasRepository.findManyByCompanyId(
				member.companyId
			);

		if (!companyAreasStates?.length) {
			throw new ResourceNotFoundError("No states found for the company");
		}

		const states = await this.statesRepository.findManyByIds(
			companyAreasStates.map((state) => state.stateId)
		);

		if (!states?.length) {
			throw new ResourceNotFoundError("No states found for the company");
		}

		const areas = await this.areasRepository.findManyByIds(
			companyAreasStates.map((area) => area.areaId)
		);

		if (!areas?.length) {
			throw new ResourceNotFoundError("No areas found for the company");
		}

		return { states, areas };
	}
}
