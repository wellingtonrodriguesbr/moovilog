import { ValidateTokenUseCase } from "@/modules/shared/use-cases/validate-token-use-case";
import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";

export function makeValidateTokenUseCase() {
  const tokensRepository = new PrismaTokensRepository();

  const validateTokenUseCase = new ValidateTokenUseCase(tokensRepository);

  return validateTokenUseCase;
}
