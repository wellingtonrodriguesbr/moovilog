import { prisma } from "@/lib/prisma";
import { FreightInformation } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

interface GetFreightFromDriverUseCaseRequest {
  driverId: string;
  freightId: string;
}

interface GetFreightFromDriverUseCaseResponse {
  freightInformation: FreightInformation;
}

export async function getFreightFromDriverUseCase({
  driverId,
  freightId,
}: GetFreightFromDriverUseCaseRequest): Promise<GetFreightFromDriverUseCaseResponse> {
  const [freight, freightInformation] = await Promise.all([
    await prisma.freight.findUnique({
      where: {
        id: freightId,
        driverId,
      },
    }),
    await prisma.freightInformation.findFirst({
      where: {
        freightId,
      },
    }),
  ]);

  if (!freight) {
    throw new ResourceNotFoundError("Freight not found");
  }

  if (!freightInformation) {
    throw new ResourceNotFoundError("Freight information not found");
  }

  if (freightInformation.freightId !== freight.id) {
    throw new UnauthorizedError("Unauthorized");
  }

  return { freightInformation };
}
