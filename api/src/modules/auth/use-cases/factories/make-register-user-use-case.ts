import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "@/modules/auth/use-cases/register-user-use-case";

export function makeRegisterUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const registerUserUseCase = new RegisterUserUseCase(usersRepository);

	return registerUserUseCase;
}
