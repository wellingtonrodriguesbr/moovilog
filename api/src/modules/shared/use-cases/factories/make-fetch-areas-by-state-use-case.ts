import { PrismaAreasRepository } from "@/modules/shared/repositories/prisma/prisma-areas-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { FetchAreasByStatesUseCase } from "@/modules/shared/use-cases/fetch-areas-by-states-use-case";

export function makeFetchAreasByStatesUseCase() {
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const fetchAreasByStatesUseCase = new FetchAreasByStatesUseCase(
		statesRepository,
		areasRepository
	);

	return fetchAreasByStatesUseCase;
}
