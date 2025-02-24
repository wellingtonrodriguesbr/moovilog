import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { FetchFreightsFromCompanyUseCase } from "@/modules/freight/use-cases/fetch-freights-from-company-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeFetchFreightsFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const companiesRepository = new PrismaCompaniesRepository();
	const freightsRepository = new PrismaFreightsRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const fetchFreightsFromCompanyUseCase = new FetchFreightsFromCompanyUseCase(
		companyMembersRepository,
		companiesRepository,
		freightsRepository,
		permissionService
	);

	return fetchFreightsFromCompanyUseCase;
}
