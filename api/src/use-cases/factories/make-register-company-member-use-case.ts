import { RegisterCompanyMemberUseCase } from "../register-company-member-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeRegisterCompanyMemberUseCase() {
  const companyMemberRepository = new PrismaCompanyMembersRepository();

  const registerCompanyMemberUseCase = new RegisterCompanyMemberUseCase(
    companyMemberRepository
  );

  return registerCompanyMemberUseCase;
}
