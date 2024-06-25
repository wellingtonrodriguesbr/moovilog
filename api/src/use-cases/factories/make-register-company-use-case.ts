import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { RegisterCompanyUseCase } from "../register-company-use-case";

export function makeRegisterCompanyUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const companiesRepository = new PrismaCompaniesRepository();

  const registerCompanyUseCase = new RegisterCompanyUseCase(
    companiesRepository,
    usersRepository
  );

  return registerCompanyUseCase;
}
