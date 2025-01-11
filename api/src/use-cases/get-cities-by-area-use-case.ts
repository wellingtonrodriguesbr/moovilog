import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ICity } from "@/interfaces/city";
import { AreasRepository } from "@/repositories/areas-repository";

interface GetCitiesByAreaUseCaseRequest {
	userId: string;
	areaId: string;
}

interface GetCitiesByAreaUseCaseResponse {
	cities: ICity[];
}

export class GetCitiesByAreaUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private citiesRepository: CitiesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		userId,
		areaId,
	}: GetCitiesByAreaUseCaseRequest): Promise<GetCitiesByAreaUseCaseResponse> {
		const [member, cities, area] = await Promise.all([
			await this.companyMembersRepository.findByUserId(userId),
			await this.citiesRepository.findManyByAreaId(areaId),
			await this.areasRepository.findById(areaId),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!area) {
			throw new ResourceNotFoundError("Area not found");
		}

		return { cities };
	}
}
