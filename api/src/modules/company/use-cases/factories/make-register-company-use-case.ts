import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { RegisterCompanyUseCase } from "@/modules/company/use-cases/register-company-use-case";

export function makeRegisterCompanyUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();

	const registerCompanyUseCase = new RegisterCompanyUseCase(
		companiesRepository,
		companyMembersRepository,
		usersRepository
	);

	return registerCompanyUseCase;
}
