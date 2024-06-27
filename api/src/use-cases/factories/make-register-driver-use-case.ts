import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { RegisterDriverUseCase } from "../register-driver-use-case";

export function makeRegisterDriverUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const driversRepository = new PrismaDriversRepository();
  const registerDriverUseCase = new RegisterDriverUseCase(
    usersRepository,
    companyMembersRepository,
    driversRepository
  );

  return registerDriverUseCase;
}
