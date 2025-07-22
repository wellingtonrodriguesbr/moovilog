import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { PrismaCitiesInRouteRepository } from "@/modules/route/repositories/prisma/prisma-cities-in-route-repository";
import { FetchCitiesFromRouteUseCase } from "@/modules/route/use-cases/fetch-cities-from-route-use-case";

export function makeFetchCitiesFromRouteUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const citiesRepository = new PrismaCitiesRepository();
  const citiesInRouteRepository = new PrismaCitiesInRouteRepository();
  const routesRepository = new PrismaRoutesRepository();

  const fetchCitiesFromRouteUseCase = new FetchCitiesFromRouteUseCase(
    companyMembersRepository,
    routesRepository,
    citiesInRouteRepository,
    citiesRepository
  );

  return fetchCitiesFromRouteUseCase;
}
