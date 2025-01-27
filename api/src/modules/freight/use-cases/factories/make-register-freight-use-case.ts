import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { RegisterFreightUseCase } from "@/modules/freight/use-cases/register-freight-use-case";

export function makeRegisterfreightUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();
	const freightsRepository = new PrismaFreightsRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();
	const routesRepository = new PrismaRoutesRepository();
	const registerFreightUseCase = new RegisterFreightUseCase(
		companyMembersRepository,
		driversRepository,
		vehiclesRepository,
		freightsRepository,
		routesRepository
	);

	return registerFreightUseCase;
}
