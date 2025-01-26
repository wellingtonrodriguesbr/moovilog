import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesRepository } from "@/repositories/prisma/prisma-cities-repository";
import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";
import { FetchCitiesByAreaUseCase } from "@/modules/shared/use-cases/fetch-cities-by-area-use-case";

export function makeFetchCitiesByAreaUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const areasRepository = new PrismaAreasRepository();

	const fetchCitiesByAreaUseCase = new FetchCitiesByAreaUseCase(
		companyMembersRepository,
		citiesRepository,
		areasRepository
	);

	return fetchCitiesByAreaUseCase;
}
