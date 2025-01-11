import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { AreasRepository } from "@/repositories/areas-repository";
import { StatesRepository } from "@/repositories/states-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IArea } from "@/interfaces/area";

interface FetchAreasByStateUseCaseRequest {
	userId: string;
	stateAcronym: string;
}

interface FetchAreasByStateUseCaseResponse {
	areas: IArea[];
}

export class FetchAreasByStateUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		userId,
		stateAcronym,
	}: FetchAreasByStateUseCaseRequest): Promise<FetchAreasByStateUseCaseResponse> {
		const transformedStateAcronym = stateAcronym.toUpperCase();

		const [member, state] = await Promise.all([
			this.companyMembersRepository.findByUserId(userId),
			this.statesRepository.findByAcronym(transformedStateAcronym),
		]);

		if (!state) {
			throw new ResourceNotFoundError("State not found");
		}

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const areas = await this.areasRepository.findManyByStateId(state.id);

		return { areas };
	}
}
