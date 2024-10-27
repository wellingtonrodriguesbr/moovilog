import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";
import { RegisterFreightUseCase } from "../register-freight-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository";
import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository";

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
