import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompanyStatesAreasRepository } from "@/repositories/prisma/prisma-company-states-areas-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";
import { FetchStatesFromCompanyUseCase } from "@/use-cases/fetch-states-from-company-use-case";

export function makeFetchStatesFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const companyStatesAreasRepository = new PrismaCompanyStatesAreasRepository();
	const fetchStatesFromCompanyUseCase = new FetchStatesFromCompanyUseCase(
		companyMembersRepository,
		statesRepository,
		companyStatesAreasRepository
	);

	return fetchStatesFromCompanyUseCase;
}
