import { SendInvitationToCompanyMemberUseCase } from "@/use-cases/send-invitation-to-company-member-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaAuthLinksRepository } from "@/repositories/prisma/prisma-auth-links-repository";

export function makeSendInvitationToCompanyMemberUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMemberRepository = new PrismaCompanyMembersRepository();
	const authLinksRepository = new PrismaAuthLinksRepository();

	const sendInvitationToCompanyMemberUseCase =
		new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMemberRepository,
			authLinksRepository
		);

	return sendInvitationToCompanyMemberUseCase;
}
