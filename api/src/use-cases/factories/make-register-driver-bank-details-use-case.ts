import { PrismaBankDetailsRepository } from "@/repositories/prisma/prisma-bank-details-repository";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { RegisterDriverBankDetailsUseCase } from "../register-driver-bank-details-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeRegisterDriverBankDetailsUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const driversRepository = new PrismaDriversRepository();
  const bankDetailsRepository = new PrismaBankDetailsRepository();
  const registerDriverBankDetailsUseCase = new RegisterDriverBankDetailsUseCase(
    companyMembersRepository,
    driversRepository,
    bankDetailsRepository
  );

  return registerDriverBankDetailsUseCase;
}
