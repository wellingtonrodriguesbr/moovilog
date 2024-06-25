import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { RegisterCompanyMemberUseCase } from "../register-company-member-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeRegisterCompanyMemberUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const companyMemberRepository = new PrismaCompanyMembersRepository();

  const registerCompanyMemberUseCase = new RegisterCompanyMemberUseCase(
    companiesRepository,
    companyMemberRepository,
    usersRepository
  );

  return registerCompanyMemberUseCase;
}
