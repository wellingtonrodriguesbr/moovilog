import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";
import { SendEmailToResetPasswordUseCase } from "@/modules/user/use-cases/send-email-to-reset-password-use-case";

export function makeSendEmailToResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const tokensRepository = new PrismaTokensRepository();

  const sendEmailToResetPasswordUseCase = new SendEmailToResetPasswordUseCase(usersRepository, tokensRepository);

  return sendEmailToResetPasswordUseCase;
}
