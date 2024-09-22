import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";
import { PrismaFreightInformationRepository } from "@/repositories/prisma/prisma-freight-information-repository";
import { PrismaCitiesByFreightRepository } from "@/repositories/prisma/prisma-cities-by-freight-repository";
import { RegisterFreightUseCase } from "../register-freight-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeRegisterfreightUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const freightsRepository = new PrismaFreightsRepository();
	const freightInformationRepository = new PrismaFreightInformationRepository();
	const citiesByFreightRepository = new PrismaCitiesByFreightRepository();
	const registerFreightUseCase = new RegisterFreightUseCase(
		companyMembersRepository,
		driversRepository,
		freightsRepository,
		freightInformationRepository,
		citiesByFreightRepository
	);

	return registerFreightUseCase;
}
