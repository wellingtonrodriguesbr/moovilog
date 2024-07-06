import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";
import { FetchFreightsFromDriverUseCase } from "../fetch-freights-from-driver-use-case";
import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";

export function makeFetchFreightsFromDriverUseCase() {
  const driversRepository = new PrismaDriversRepository();
  const freightsRepository = new PrismaFreightsRepository();

  const fetchFreightsFromDriverUseCase = new FetchFreightsFromDriverUseCase(
    driversRepository,
    freightsRepository
  );

  return fetchFreightsFromDriverUseCase;
}
