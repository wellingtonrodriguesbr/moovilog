import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { AuthenticateDriverUseCase } from "../authenticate-driver-use-case";

export function makeAuthenticateDriverUseCase() {
	const driversRepository = new PrismaDriversRepository();
	const authenticateDriverUseCase = new AuthenticateDriverUseCase(
		driversRepository,
	);

	return authenticateDriverUseCase;
}
