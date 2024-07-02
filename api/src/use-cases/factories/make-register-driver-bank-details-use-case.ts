import { PrismaBankDetailsRepository } from "@/repositories/prisma/prisma-bank-details-repository";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterDriverBankDetailsUseCase } from "../register-driver-bank-details-use-case";

export function makeRegisterDriverBankDetailsUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const driversRepository = new PrismaDriversRepository();
  const bankDetailsRepository = new PrismaBankDetailsRepository();
  const registerDriverBankDetailsUseCase = new RegisterDriverBankDetailsUseCase(
    usersRepository,
    driversRepository,
    bankDetailsRepository
  );

  return registerDriverBankDetailsUseCase;
}
