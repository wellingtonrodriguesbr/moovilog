import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { RegisterCompanyUseCase } from "../register-company-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

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
