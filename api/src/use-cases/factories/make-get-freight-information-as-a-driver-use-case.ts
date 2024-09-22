import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightInformationRepository } from "@/repositories/prisma/prisma-freight-information-repository";
import { GetFreightInformationAsADriverUseCase } from "../get-freight-information-as-a-driver-use-case";
import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";

export function makeGetFreightInformationAsADriverUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const freightsRepository = new PrismaFreightsRepository();
	const freightsInformationRepository =
		new PrismaFreightInformationRepository();

	const getFreightInformationAsADriverUseCase =
		new GetFreightInformationAsADriverUseCase(
			driversRepository,
			freightsRepository,
			freightsInformationRepository
		);

	return getFreightInformationAsADriverUseCase;
}
