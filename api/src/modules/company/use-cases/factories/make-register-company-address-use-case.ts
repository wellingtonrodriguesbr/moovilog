import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaAddressesRepository } from "@/modules/shared/repositories/prisma/prisma-addresses-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { RegisterCompanyAddressUseCase } from "@/modules/company/use-cases/register-company-address-use-case";
import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users-repository";

export function makeRegisterCompanyAddressUseCase() {
  const citiesRepository = new PrismaCitiesRepository();
  const statesRepository = new PrismaStatesRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const addressesRepository = new PrismaAddressesRepository();
  const usersRepository = new PrismaUsersRepository();

  const registerCompanyAddressUseCase = new RegisterCompanyAddressUseCase(
    addressesRepository,
    citiesRepository,
    statesRepository,
    companiesRepository,
    usersRepository
  );

  return registerCompanyAddressUseCase;
}
