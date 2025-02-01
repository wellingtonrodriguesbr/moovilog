import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaAddressesRepository } from "@/modules/shared/repositories/prisma/prisma-addresses-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { GetCompanyAddressUseCase } from "@/modules/company/use-cases/get-company-address-use-case";

export function makeGetCompanyAddressUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const addressesRepository = new PrismaAddressesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const statesRepository = new PrismaStatesRepository();

	const getCompanyAddressUseCase = new GetCompanyAddressUseCase(
		companyMembersRepository,
		companiesRepository,
		addressesRepository,
		citiesRepository,
		statesRepository
	);

	return getCompanyAddressUseCase;
}
