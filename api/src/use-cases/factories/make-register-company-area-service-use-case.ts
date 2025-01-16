import { RegisterCompanyAreaServiceUseCase } from "@/use-cases/register-company-area-service-use-case";
import { PrismaCompanyStatesAreasRepository } from "@/repositories/prisma/prisma-company-states-areas-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaAreasRepository } from "@/repositories/prisma/prisma-areas-repository";

export function makeRegisterCompanyAreaServiceUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const statesRepository = new PrismaStatesRepository();
	const areasRepository = new PrismaAreasRepository();
	const companyStatesAreasRepository = new PrismaCompanyStatesAreasRepository();

	const registerCompanyAreaServiceUseCase =
		new RegisterCompanyAreaServiceUseCase(
			companyMembersRepository,
			statesRepository,
			areasRepository,
			companyStatesAreasRepository
		);

	return registerCompanyAreaServiceUseCase;
}
