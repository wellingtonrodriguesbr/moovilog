import { SendInvitationToCompanyMemberUseCase } from "@/modules/company-member/use-cases/send-invitation-to-company-member-use-case";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";
import { PrismaTokensRepository } from "@/modules/shared/repositories/prisma/prisma-tokens-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PermissionService } from "@/services/permission-service";

export function makeSendInvitationToCompanyMemberUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const tokensRepository = new PrismaTokensRepository();

	const permissionService = new PermissionService(companyMembersRepository);

	const sendInvitationToCompanyMemberUseCase =
		new SendInvitationToCompanyMemberUseCase(
			usersRepository,
			companyMembersRepository,
			companiesRepository,
			tokensRepository,
			permissionService
		);

	return sendInvitationToCompanyMemberUseCase;
}
