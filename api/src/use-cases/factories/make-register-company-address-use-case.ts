import { PrismaCompaniesRepository } from "@/repositories/prisma/prisma-companies-repository";
import { RegisterCompanyAddressUseCase } from "../register-company-address-use-case";
import { PrismaCitiesRepository } from "@/repositories/prisma/prisma-cities-repository";
import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaCompanyAddressesRepository } from "@/repositories/prisma/prisma-company-addresses-repository";

export function makeRegisterCompanyAddressUseCase() {
  const citiesRepository = new PrismaCitiesRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const companyAddressRepository = new PrismaCompanyAddressesRepository();
  const addressesRepository = new PrismaAddressesRepository();

  const registerCompanyAddressUseCase = new RegisterCompanyAddressUseCase(
    companyAddressRepository,
    addressesRepository,
    citiesRepository,
    companiesRepository
  );

  return registerCompanyAddressUseCase;
}
