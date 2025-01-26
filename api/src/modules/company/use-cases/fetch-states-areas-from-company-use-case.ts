import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompanyStatesAreasRepository } from "@/modules/company/repositories/company-states-areas-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { AreasRepository } from "@/modules/shared/repositories/areas-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IState } from "@/modules/shared/interfaces/state";
import { IArea } from "@/modules/shared/interfaces/area";

interface FetchStatesAreasFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchStatesAreasFromCompanyUseCaseResponse {
	states: IState[];
	areas: IArea[];
}

export class FetchStatesAreasFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companyStatesAreasRepository: CompanyStatesAreasRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		userId,
		companyId,
	}: FetchStatesAreasFromCompanyUseCaseRequest): Promise<FetchStatesAreasFromCompanyUseCaseResponse> {
		const memberInCompany =
			await this.companyMembersRepository.findMemberInCompany(
				userId,
				companyId
			);

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		const companyAreasStates =
			await this.companyStatesAreasRepository.findManyByCompanyId(companyId);

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
