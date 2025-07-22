import { RegisterRouteUseCase } from "@/modules/route/use-cases/register-route-use-case";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { PrismaCitiesInRouteRepository } from "@/modules/route/repositories/prisma/prisma-cities-in-route-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterRouteUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const routesRepository = new PrismaRoutesRepository();
  const citiesInRouteRepository = new PrismaCitiesInRouteRepository();
  const citiesRepository = new PrismaCitiesRepository();
  const statesRepository = new PrismaStatesRepository();

  const permissionService = new PermissionService(companyMembersRepository);

  const registerRouteUseCase = new RegisterRouteUseCase(
    companyMembersRepository,
    routesRepository,
    citiesRepository,
    statesRepository,
    citiesInRouteRepository,
    permissionService
  );

  return registerRouteUseCase;
}
