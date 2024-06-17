import { prisma } from "@/lib/prisma";
import { Freight } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchFreightFromDriverUseCaseRequest {
  driverId: string;
}

interface FetchFreightFromDriverUseCaseResponse {
  freights: Freight[];
}

export async function fetchFreightFromDriverUseCase({
  driverId,
}: FetchFreightFromDriverUseCaseRequest): Promise<FetchFreightFromDriverUseCaseResponse> {
  const [driver, freights] = await Promise.all([
    await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    }),
    await prisma.freight.findMany({
      where: {
        driverId,
      },
    }),
  ]);

  if (!driver) {
    throw new ResourceNotFoundError("Driver not found");
  }

  return { freights };
}
