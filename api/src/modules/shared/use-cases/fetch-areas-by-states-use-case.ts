import { AreasRepository } from "@/modules/shared/repositories/areas-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IArea } from "@/modules/shared/interfaces/area";

interface FetchAreasByStatesUseCaseRequest {
	stateAcronyms: string[];
}

interface FetchAreasByStatesUseCaseResponse {
	areas: IArea[];
}

export class FetchAreasByStatesUseCase {
	constructor(
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		stateAcronyms,
	}: FetchAreasByStatesUseCaseRequest): Promise<FetchAreasByStatesUseCaseResponse> {
		const states =
			await this.statesRepository.findManyByAcronyms(stateAcronyms);

		if (!states?.length) {
			throw new ResourceNotFoundError(
				"No states found for the provided acronyms"
			);
		}

		const areas = await this.areasRepository.findManyByStateIds(
			states.map((state) => state.id)
		);

		return { areas };
	}
}
