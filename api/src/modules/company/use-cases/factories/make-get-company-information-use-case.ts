import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaAddressesRepository } from "@/modules/shared/repositories/prisma/prisma-addresses-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { GetCompanyInformationUseCase } from "@/modules/company/use-cases/get-company-information-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";

export function makeGetCompanyInformationUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const addressesRepository = new PrismaAddressesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const statesRepository = new PrismaStatesRepository();

	const getCompanyInformationUseCase = new GetCompanyInformationUseCase(
		usersRepository,
		companyMembersRepository,
		companiesRepository,
		addressesRepository,
		citiesRepository,
		statesRepository
	);

	return getCompanyInformationUseCase;
}
