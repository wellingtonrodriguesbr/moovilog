import { RegisterRouteUseCase } from "@/use-cases/register-route-use-case";
import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesInRouteRepository } from "@/repositories/prisma/prisma-cities-in-route-repository";

export function makeRegisterRouteUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const routesRepository = new PrismaRoutesRepository();
	const citiesInRouteRepository = new PrismaCitiesInRouteRepository();

	const registerRouteUseCase = new RegisterRouteUseCase(
		companyMembersRepository,
		routesRepository,
		citiesInRouteRepository
	);

	return registerRouteUseCase;
}
