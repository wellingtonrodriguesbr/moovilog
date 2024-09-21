import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { RegisterDriverUseCase } from "../register-driver-use-case";

export function makeRegisterDriverUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();
	const registerDriverUseCase = new RegisterDriverUseCase(
		companyMembersRepository,
		driversRepository,
	);

	return registerDriverUseCase;
}
