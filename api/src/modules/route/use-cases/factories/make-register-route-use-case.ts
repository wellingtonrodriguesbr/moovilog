import { RegisterRouteUseCase } from "@/modules/route/use-cases/register-route-use-case";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { PrismaCitiesInRouteRepository } from "@/modules/route/repositories/prisma/prisma-cities-in-route-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";

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
