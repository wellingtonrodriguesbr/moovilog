import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";
import { FetchAreasByStateUseCase } from "@/use-cases/fetch-areas-by-state-use-case";

export function makeFetchAreasByStateUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const fetchAreasByStateUseCase = new FetchAreasByStateUseCase(
		companyMembersRepository,
		statesRepository,
		areasRepository
	);

	return fetchAreasByStateUseCase;
}
