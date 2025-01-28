import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaAreasRepository } from "@/modules/shared/repositories/prisma/prisma-areas-repository";
import { FetchCitiesByAreaUseCase } from "@/modules/shared/use-cases/fetch-cities-by-area-use-case";

export function makeFetchCitiesByAreaUseCase() {
	const citiesRepository = new PrismaCitiesRepository();
	const areasRepository = new PrismaAreasRepository();

	const fetchCitiesByAreaUseCase = new FetchCitiesByAreaUseCase(
		citiesRepository,
		areasRepository
	);

	return fetchCitiesByAreaUseCase;
}
