import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { FetchVehiclesByCompanyUseCase } from "@/use-cases/fetch-vehicles-by-company-use-case";

export function makeFetchVehiclesByCompanyUseCase() {
	const vehiclesRepository = new PrismaVehiclesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchVehiclesByCompanyUseCase = new FetchVehiclesByCompanyUseCase(
		vehiclesRepository,
		companiesRepository,
		companyMembersRepository
	);

	return fetchVehiclesByCompanyUseCase;
}
