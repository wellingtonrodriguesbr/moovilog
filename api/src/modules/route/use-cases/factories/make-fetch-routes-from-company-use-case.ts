import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { FetchRoutesFromCompanyUseCase } from "@/modules/route/use-cases/fetch-routes-from-company-use-case";

export function makeFetchRoutesFromCompanyUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const routesRepository = new PrismaRoutesRepository();

  const fetchRoutesFromCompanyUseCase = new FetchRoutesFromCompanyUseCase(
    companyMembersRepository,
    companiesRepository,
    routesRepository
  );

  return fetchRoutesFromCompanyUseCase;
}
