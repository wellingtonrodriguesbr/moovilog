import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { RegisterDriverUseCase } from "@/modules/driver/use-cases/register-driver-use-case";

export function makeRegisterDriverUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();
	const registerDriverUseCase = new RegisterDriverUseCase(
		companyMembersRepository,
		driversRepository
	);

	return registerDriverUseCase;
}
