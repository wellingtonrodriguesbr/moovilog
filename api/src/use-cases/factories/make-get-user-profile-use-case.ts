import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeGetUserProfileUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const getUserProfileUseCase = new GetUserProfileUseCase(
		usersRepository,
		companyMembersRepository
	);

	return getUserProfileUseCase;
}
