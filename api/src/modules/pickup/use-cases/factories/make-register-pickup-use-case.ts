import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaPickupsRepository } from "@/modules/pickup/repositories/prisma/prisma-pickups-repository";
import { PrismaPickupHistoriesRepository } from "@/modules/pickup/repositories/prisma/prisma-pickup-histories-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { RegisterPickupUseCase } from "@/modules/pickup/use-cases/register-pickup-use-case";
import { PrismaCompaniesRepository } from "@/modules/company/repositories/prisma/prisma-companies-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { PrismaAddressesRepository } from "@/modules/shared/repositories/prisma/prisma-addresses-repository";
import { PrismaCitiesRepository } from "@/modules/shared/repositories/prisma/prisma-cities-repository";
import { PrismaStatesRepository } from "@/modules/shared/repositories/prisma/prisma-states-repository";
import { TransactionService } from "@/services/transaction-service";
import { PermissionService } from "@/services/permission-service";

export function makeRegisterPickupUseCase() {
  const companyMembersRepository = new PrismaCompanyMembersRepository();
  const companiesRepository = new PrismaCompaniesRepository();
  const freightsRepository = new PrismaFreightsRepository();
  const addressesRepository = new PrismaAddressesRepository();
  const citiesRepository = new PrismaCitiesRepository();
  const statesRepository = new PrismaStatesRepository();
  const driversRepository = new PrismaDriversRepository();
  const vehiclesRepository = new PrismaVehiclesRepository();
  const pickupsRepository = new PrismaPickupsRepository();
  const pickupHistoriesRepository = new PrismaPickupHistoriesRepository();
  const transactionService = new TransactionService();

  const permissionService = new PermissionService(companyMembersRepository);

  const registerPickupUseCase = new RegisterPickupUseCase(
    companyMembersRepository,
    companiesRepository,
    freightsRepository,
    addressesRepository,
    citiesRepository,
    statesRepository,
    driversRepository,
    vehiclesRepository,
    pickupsRepository,
    pickupHistoriesRepository,
    permissionService,
    transactionService
  );

  return registerPickupUseCase;
}
