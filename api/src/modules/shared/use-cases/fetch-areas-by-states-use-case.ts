import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { AreasRepository } from "@/repositories/areas-repository";
import { StatesRepository } from "@/repositories/states-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IArea } from "@/interfaces/area";

interface FetchAreasByStatesUseCaseRequest {
	userId: string;
	stateAcronyms: string[];
}

interface FetchAreasByStatesUseCaseResponse {
	areas: IArea[];
}

export class FetchAreasByStatesUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		userId,
		stateAcronyms,
	}: FetchAreasByStatesUseCaseRequest): Promise<FetchAreasByStatesUseCaseResponse> {
		const [member, states] = await Promise.all([
			this.companyMembersRepository.findByUserId(userId),
			this.statesRepository.findManyByAcronyms(stateAcronyms),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

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
