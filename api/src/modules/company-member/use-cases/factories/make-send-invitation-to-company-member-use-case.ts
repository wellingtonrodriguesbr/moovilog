import { SendInvitationToCompanyMemberUseCase } from "@/modules/company-member/use-cases/send-invitation-to-company-member-use-case";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";

export function makeSendInvitationToCompanyMemberUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMemberRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const tokensRepository = new PrismaTokensRepository();

	const sendInvitationToCompanyMemberUseCase =
		new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMemberRepository,
			companiesRepository,
			tokensRepository
		);

	return sendInvitationToCompanyMemberUseCase;
}
