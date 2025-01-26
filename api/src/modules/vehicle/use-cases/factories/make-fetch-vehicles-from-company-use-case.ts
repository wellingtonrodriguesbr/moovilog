import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { FetchVehiclesFromCompanyUseCase } from "@/modules/vehicle/use-cases/fetch-vehicles-from-company-use-case";

export function makeFetchVehiclesFromCompanyUseCase() {
	const vehiclesRepository = new PrismaVehiclesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchVehiclesFromCompanyUseCase = new FetchVehiclesFromCompanyUseCase(
		vehiclesRepository,
		companiesRepository,
		companyMembersRepository
	);

	return fetchVehiclesFromCompanyUseCase;
}
