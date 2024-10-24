import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository";
import { RegisterVehicleUseCase } from "../register-vehicle-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeRegisterVehicleUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();
	const registerVehicleUseCase = new RegisterVehicleUseCase(
		companyMembersRepository,
		vehiclesRepository
	);

	return registerVehicleUseCase;
}
