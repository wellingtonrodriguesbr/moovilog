import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompanyStatesAreasRepository } from "@/modules/company/repositories/prisma/prisma-company-states-areas-repository";
import { PrismaAreasRepository } from "@/modules/shared/repositories/prisma/prisma-areas-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { FetchStatesAreasFromCompanyUseCase } from "@/modules/company/use-cases/fetch-states-areas-from-company-use-case";

export function makeFetchStatesAreasFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const companyStatesAreasRepository = new PrismaCompanyStatesAreasRepository();
	const fetchStatesAreasFromCompanyUseCase =
		new FetchStatesAreasFromCompanyUseCase(
			companyMembersRepository,
			companyStatesAreasRepository,
			statesRepository,
			areasRepository
		);

	return fetchStatesAreasFromCompanyUseCase;
}
