import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesRepository } from "@/repositories/prisma/prisma-cities-repository";
import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";
import { GetCitiesByAreaUseCase } from "@/use-cases/get-cities-by-area-use-case";

export function makeGetCitiesByAreaUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const areasRepository = new PrismaAreasRepository();

	const getCitiesByAreaUseCase = new GetCitiesByAreaUseCase(
		companyMembersRepository,
		citiesRepository,
		areasRepository
	);

	return getCitiesByAreaUseCase;
}
