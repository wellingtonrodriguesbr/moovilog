import { GetUserProfileUseCase } from "@/modules/user/use-cases/get-user-profile-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";

export function makeGetUserProfileUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

	return getUserProfileUseCase;
}
