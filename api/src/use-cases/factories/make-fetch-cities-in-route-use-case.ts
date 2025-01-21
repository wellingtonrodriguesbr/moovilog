import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesRepository } from "@/repositories/prisma/prisma-cities-repository";
import { FetchCitiesInRouteUseCase } from "@/use-cases/fetch-cities-in-route-use-case";
import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository";
import { PrismaCitiesInRouteRepository } from "@/repositories/prisma/prisma-cities-in-route-repository";

export function makeFetchCitiesInRouteUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const citiesInRouteRepository = new PrismaCitiesInRouteRepository();
	const routesRepository = new PrismaRoutesRepository();

	const fetchCitiesInRouteUseCase = new FetchCitiesInRouteUseCase(
		companyMembersRepository,
		routesRepository,
		citiesInRouteRepository,
		citiesRepository
	);

	return fetchCitiesInRouteUseCase;
}
