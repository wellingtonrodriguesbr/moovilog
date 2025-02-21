import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { UpdateVehicleStatusUseCase } from "@/modules/vehicle/use-cases/update-vehicle-status-use-case";

export function makeUpdateVehicleStatusUseCase() {
	const vehiclesRepository = new PrismaVehiclesRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const updateVehicleStatusUseCase = new UpdateVehicleStatusUseCase(
		companyMembersRepository,
		companiesRepository,
		vehiclesRepository
	);

	return updateVehicleStatusUseCase;
}
