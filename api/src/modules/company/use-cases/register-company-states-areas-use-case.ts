import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompanyStatesAreasRepository } from "@/modules/company/repositories/company-states-areas-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { AreasRepository } from "@/modules/shared/repositories/areas-repository";

interface RegisterCompanyStatesAreasUseCaseRequest {
	stateAcronyms: string[];
	areaIds: string[];
	userId: string;
}

type RegisterCompanyStatesAreasUseCaseResponse = void;

export class RegisterCompanyStatesAreasUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository,
		private companyStatesAreasRepository: CompanyStatesAreasRepository
	) {}

	async execute({
		stateAcronyms,
		areaIds,
		userId,
	}: RegisterCompanyStatesAreasUseCaseRequest): Promise<RegisterCompanyStatesAreasUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const [states, areas] = await Promise.all([
			this.statesRepository.findManyByAcronyms(stateAcronyms),
			this.areasRepository.findManyByIds(areaIds),
		]);

		if (!states?.length) {
			throw new ResourceNotFoundError("No states found for the provided ids");
		}

		if (!areas?.length) {
			throw new ResourceNotFoundError("No areas found for the provided ids");
		}

		const entries = states.flatMap((state) =>
			areaIds.map((areaId) => ({
				companyId: member.companyId,
				stateId: state.id,
				areaId,
			}))
		);

		await this.companyStatesAreasRepository.createMany(entries);
	}
}
