import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaPickupsRepository } from "@/modules/pickup/repositories/prisma/prisma-pickups-repository";
import { FetchPickupsFromCompanyUseCase } from "@/modules/pickup/use-cases/fetch-pickups-from-company-use-case";
import { PermissionService } from "@/services/permission-service";

export function makeFetchPickupsFromCompanyUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const pickupsRepository = new PrismaPickupsRepository();

  const permissionService = new PermissionService(companyMembersRepository);

  const fetchPickupsFromCompanyUseCase = new FetchPickupsFromCompanyUseCase(
    companyMembersRepository,
    companiesRepository,
    pickupsRepository,
    permissionService
  );

  return fetchPickupsFromCompanyUseCase;
}
