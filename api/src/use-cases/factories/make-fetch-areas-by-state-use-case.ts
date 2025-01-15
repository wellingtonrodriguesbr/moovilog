import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";
import { FetchAreasByStatesUseCase } from "@/use-cases/fetch-areas-by-states-use-case";

export function makeFetchAreasByStatesUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const fetchAreasByStatesUseCase = new FetchAreasByStatesUseCase(
		companyMembersRepository,
		statesRepository,
		areasRepository
	);

	return fetchAreasByStatesUseCase;
}
