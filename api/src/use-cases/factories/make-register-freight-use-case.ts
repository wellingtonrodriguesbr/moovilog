import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";
import { PrismaFreightInformationRepository } from "@/repositories/prisma/prisma-freight-information-repository";
import { PrismaFreightsByCompanyRepository } from "@/repositories/prisma/prisma-freights-by-company-repository";
import { PrismaCitiesByFreightRepository } from "@/repositories/prisma/prisma-cities-by-freight-repository";
import { RegisterFreightUseCase } from "../register-freight-use-case";

export function makeRegisterfreightUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const driversRepository = new PrismaDriversRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const freightsRepository = new PrismaFreightsRepository();
  const freightInformationRepository = new PrismaFreightInformationRepository();
  const freightsByCompanyRepository = new PrismaFreightsByCompanyRepository();
  const citiesByFreightRepository = new PrismaCitiesByFreightRepository();
  const registerFreightUseCase = new RegisterFreightUseCase(
    usersRepository,
    driversRepository,
    companiesRepository,
    freightsRepository,
    freightInformationRepository,
    freightsByCompanyRepository,
    citiesByFreightRepository
  );

  return registerFreightUseCase;
}
