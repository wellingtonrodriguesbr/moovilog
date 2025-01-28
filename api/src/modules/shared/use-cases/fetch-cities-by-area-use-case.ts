import { AreasRepository } from "@/modules/shared/repositories/areas-repository";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { ICity } from "@/modules/shared/interfaces/city";

interface FetchCitiesByAreaUseCaseRequest {
	areaCode: number;
}

interface FetchCitiesByAreaUseCaseResponse {
	cities: ICity[];
}

export class FetchCitiesByAreaUseCase {
	constructor(
		private citiesRepository: CitiesRepository,
		private areasRepository: AreasRepository
	) {}

	async execute({
		areaCode,
	}: FetchCitiesByAreaUseCaseRequest): Promise<FetchCitiesByAreaUseCaseResponse> {
		const area = await this.areasRepository.findByCode(areaCode);

		if (!area) {
			throw new ResourceNotFoundError("Area not found");
		}

		const cities = await this.citiesRepository.findManyByAreaId(area.id);

		return { cities };
	}
}
