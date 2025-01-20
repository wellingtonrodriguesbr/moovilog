import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompanyStatesAreasRepository } from "@/repositories/prisma/prisma-company-states-areas-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";
import { FetchAreasStatesFromCompanyUseCase } from "@/use-cases/fetch-areas-states-from-company-use-case";

export function makeFetchAreasStatesFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const companyStatesAreasRepository = new PrismaCompanyStatesAreasRepository();
	const fetchAreasStatesFromCompanyUseCase =
		new FetchAreasStatesFromCompanyUseCase(
			companyMembersRepository,
			statesRepository,
			areasRepository,
			companyStatesAreasRepository
		);

	return fetchAreasStatesFromCompanyUseCase;
}
