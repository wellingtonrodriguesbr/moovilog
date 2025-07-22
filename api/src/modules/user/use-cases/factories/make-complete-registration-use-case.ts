import { CompleteRegistrationUseCase } from "@/modules/user/use-cases/complete-registration-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";

export function makeCompleteRegistrationUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const tokensRepository = new PrismaTokensRepository();

  const completeRegistrationUseCase = new CompleteRegistrationUseCase(
    usersRepository,
    companyMembersRepository,
    tokensRepository
  );

  return completeRegistrationUseCase;
}
