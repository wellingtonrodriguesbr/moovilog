import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { GetCompanyInformationUseCase } from "@/modules/company/use-cases/get-company-information-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";

export function makeGetCompanyInformationUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();

	const getCompanyInformationUseCase = new GetCompanyInformationUseCase(
		usersRepository,
		companyMembersRepository,
		companiesRepository
	);

	return getCompanyInformationUseCase;
}
