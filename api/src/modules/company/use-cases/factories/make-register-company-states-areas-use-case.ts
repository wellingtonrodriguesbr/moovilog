import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { PrismaAreasRepository } from "@/modules/shared/repositories/prisma/prisma-areas-repository";
import { PrismaCompanyStatesAreasRepository } from "@/modules/company/repositories/prisma/prisma-company-states-areas-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { RegisterCompanyStatesAreasUseCase } from "@/modules/company/use-cases/register-company-states-areas-use-case";

export function makeRegisterCompanyStatesAreasUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const companyStatesAreasRepository = new PrismaCompanyStatesAreasRepository();

	const registerCompanyStatesAreasUseCase =
		new RegisterCompanyStatesAreasUseCase(
			companyMembersRepository,
			statesRepository,
			areasRepository,
			companyStatesAreasRepository
		);

	return registerCompanyStatesAreasUseCase;
}
