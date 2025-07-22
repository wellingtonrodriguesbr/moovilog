import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { GetFreightDetailsUseCase } from "@/modules/freight/use-cases/get-freight-details-use-case";

export function makeGetFreightDetailsUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const freightsRepository = new PrismaFreightsRepository();

  const getFreightDetailsUseCase = new GetFreightDetailsUseCase(
    companyMembersRepository,
    companiesRepository,
    freightsRepository
  );

  return getFreightDetailsUseCase;
}
