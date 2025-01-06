import { PrismaAuthLinksRepository } from "@/repositories/prisma/prisma-auth-links-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserPasswordUseCase } from "@/use-cases/update-user-password-use-case";

export function makeUpdateUserPasswordUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const authLinksRepository = new PrismaAuthLinksRepository();

	const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
		usersRepository,
		companyMembersRepository,
		authLinksRepository
	);

	return updateUserPasswordUseCase;
}
