import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { UpdateUserPasswordUseCase } from "@/modules/user/use-cases/update-user-password-use-case";

export function makeUpdateUserPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const tokensRepository = new PrismaTokensRepository();

  const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(usersRepository, tokensRepository);

  return updateUserPasswordUseCase;
}
