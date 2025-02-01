import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { GetCompanyInformationUseCase } from "@/modules/company/use-cases/get-company-information-use-case";

export function makeGetCompanyInformationUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();

	const getCompanyInformationUseCase = new GetCompanyInformationUseCase(
		companyMembersRepository,
		companiesRepository
	);

	return getCompanyInformationUseCase;
}
