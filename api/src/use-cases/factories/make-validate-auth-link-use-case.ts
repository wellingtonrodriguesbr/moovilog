import { PrismaAuthLinksRepository } from "@/repositories/prisma/prisma-tokens-repository";
import { ValidateAuthLinkUseCase } from "@/use-cases/validate-token-use-case";

export function makeValidateAuthLinkUseCase() {
	const authLinksRepository = new PrismaAuthLinksRepository();

	const validateAuthLinkUseCase = new ValidateAuthLinkUseCase(
		authLinksRepository
	);

	return validateAuthLinkUseCase;
}
