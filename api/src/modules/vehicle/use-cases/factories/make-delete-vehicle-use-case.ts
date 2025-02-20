import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { DeleteVehicleUseCase } from "@/modules/vehicle/use-cases/delete-vehicle-use-case";

export function makeDeleteVehicleUseCase() {
	const vehiclesRepository = new PrismaVehiclesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const deleteVehicleUseCase = new DeleteVehicleUseCase(
		companyMembersRepository,
		companiesRepository,
		vehiclesRepository
	);

	return deleteVehicleUseCase;
}
