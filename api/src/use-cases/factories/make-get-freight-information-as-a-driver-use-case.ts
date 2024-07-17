import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightInformationRepository } from "@/repositories/prisma/prisma-freight-information-repository";
import { GetFreightInformationAsADriverUseCase } from "../get-freight-information-as-a-driver-use-case";

export function makeGetFreightInformationAsADriverUseCase() {
  const driversRepository = new PrismaDriversRepository();
  const freightsInformationRepository =
    new PrismaFreightInformationRepository();

  const getFreightInformationAsADriverUseCase =
    new GetFreightInformationAsADriverUseCase(
      driversRepository,
      freightsInformationRepository
    );

  return getFreightInformationAsADriverUseCase;
}
