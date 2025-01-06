import { PrismaAuthLinksRepository } from "@/repositories/prisma/prisma-auth-links-repository";
import { ValidateAuthLinkUseCase } from "@/use-cases/validate-auth-link-use-case";

export function makeValidateAuthLinkUseCase() {
	const authLinksRepository = new PrismaAuthLinksRepository();

	const validateAuthLinkUseCase = new ValidateAuthLinkUseCase(
		authLinksRepository
	);

	return validateAuthLinkUseCase;
}
