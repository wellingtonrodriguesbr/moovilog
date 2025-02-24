import { RegisterRouteUseCase } from "@/modules/route/use-cases/register-route-use-case";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { PrismaCitiesInRouteRepository } from "@/modules/route/repositories/prisma/prisma-cities-in-route-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/prisma/prisma-company-member-permissions-repository";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterRouteUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const routesRepository = new PrismaRoutesRepository();
	const citiesInRouteRepository = new PrismaCitiesInRouteRepository();

	const companyMemberPermissionsRepository =
		new PrismaCompanyMemberPermissionsRepository();

	const permissionService = new PermissionService(
		companyMemberPermissionsRepository
	);

	const registerRouteUseCase = new RegisterRouteUseCase(
		companyMembersRepository,
		routesRepository,
		citiesInRouteRepository,
		permissionService
	);

	return registerRouteUseCase;
}
