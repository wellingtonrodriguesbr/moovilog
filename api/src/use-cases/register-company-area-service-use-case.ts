import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { StatesRepository } from "@/repositories/states-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { AreasRepository } from "@/repositories/areas-repository";
import { CompanyStatesAreasRepository } from "@/repositories/company-states-areas-repository";

interface RegisterCompanyAreaServiceUseCaseRequest {
	stateIds: string[];
	areaIds: string[];
	userId: string;
}

type RegisterCompanyAreaServiceUseCaseResponse = void;

export class RegisterCompanyAreaServiceUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private statesRepository: StatesRepository,
		private areasRepository: AreasRepository,
		private companyStatesAreasRepository: CompanyStatesAreasRepository
	) {}

	async execute({
		stateIds,
		areaIds,
		userId,
	}: RegisterCompanyAreaServiceUseCaseRequest): Promise<RegisterCompanyAreaServiceUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const [states, areas] = await Promise.all([
			this.statesRepository.findManyByIds(stateIds),
			this.areasRepository.findManyByIds(areaIds),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!states?.length) {
			throw new ResourceNotFoundError("No states found for the provided ids");
		}

		if (!areas?.length) {
			throw new ResourceNotFoundError("No areas found for the provided ids");
		}

		const entries = stateIds.flatMap((stateId) =>
			areaIds.map((areaId) => ({
				companyId: member.companyId,
				stateId,
				areaId,
			}))
		);

		await this.companyStatesAreasRepository.createMany(entries);
	}
}
