import { GetCompanyInformationUseCase } from "../get-company-information-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaCitiesRepository } from "@/repositories/prisma/prisma-cities-repository";
import { PrismaStatesRepository } from "@/repositories/prisma/prisma-states-repository";

export function makeGetCompanyInformationUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const addressesRepository = new PrismaAddressesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const citiesRepository = new PrismaCitiesRepository();
	const statesRepository = new PrismaStatesRepository();

	const getCompanyInformationUseCase = new GetCompanyInformationUseCase(
		companyMembersRepository,
		companiesRepository,
		addressesRepository,
		citiesRepository,
		statesRepository
	);

	return getCompanyInformationUseCase;
}
