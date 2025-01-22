import { GetUserProfileUseCase } from "@/modules/user/use-cases/get-user-profile-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";

export function makeGetUserProfileUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const getUserProfileUseCase = new GetUserProfileUseCase(
		usersRepository,
		companyMembersRepository
	);

	return getUserProfileUseCase;
}
