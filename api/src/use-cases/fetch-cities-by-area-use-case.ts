import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { AreasRepository } from "@/repositories/areas-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ICity } from "@/interfaces/city";

interface FetchCitiesByAreaUseCaseRequest {
	userId: string;
	areaCode: number;
}

interface FetchCitiesByAreaUseCaseResponse {
	cities: ICity[];
}

export class FetchCitiesByAreaUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private citiesRepository: CitiesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		userId,
		areaCode,
	}: FetchCitiesByAreaUseCaseRequest): Promise<FetchCitiesByAreaUseCaseResponse> {
		const [member, area] = await Promise.all([
			this.companyMembersRepository.findByUserId(userId),
			this.areasRepository.findByCode(areaCode),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!area) {
			throw new ResourceNotFoundError("Area not found");
		}

		const cities = await this.citiesRepository.findManyByAreaId(area.id);

		return { cities };
	}
}
