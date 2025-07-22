import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/modules/auth/use-cases/authenticate-use-case";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
