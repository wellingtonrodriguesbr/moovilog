import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { Freight, FreightType } from "@prisma/client";

interface RegisterFreightUseCaseRequest {
  type: FreightType;
  date: Date;
  observation?: string | null;
  pickupsQuantity: number;
  deliveriesQuantity: number;
  totalWeightOfPickups: number;
  totalWeightOfDeliveries: number;
  freightAmountInCents: number;
  citiesIds: string[];
  driverId: string;
  creatorId: string;
}

interface RegisterFreightUseCaseResponse {
  freight: Freight;
}

export async function registerFreightUseCase({
  type,
  date,
  observation,
  pickupsQuantity,
  deliveriesQuantity,
  totalWeightOfPickups,
  totalWeightOfDeliveries,
  freightAmountInCents,
  citiesIds,
  driverId,
  creatorId,
}: RegisterFreightUseCaseRequest): Promise<RegisterFreightUseCaseResponse> {
  const [user, company] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    }),
    await prisma.company.findFirst({
      where: {
        companyMembers: {
          some: {
            memberId: creatorId,
          },
        },
      },
    }),
  ]);

  console.log(user);

  if (user?.role !== ("ADMIN" || "OPERATIONAL")) {
    throw new UnauthorizedError(
      "You do not have permission to perform this action, please ask your administrator for access"
    );
  }

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const freight = await prisma.freight.create({
    data: {
      date,
      type,
      pickupsQuantity,
      deliveriesQuantity,
      totalWeightOfPickups,
      totalWeightOfDeliveries,
      freightAmountInCents,
      observation,
      driverId,
      creatorId,
      freightsByCompany: {
        create: {
          companyId: company.id,
        },
      },
      citiesByFreight: {
        createMany: {
          data: citiesIds.map((id) => {
            return {
              cityId: id,
            };
          }),
        },
      },
    },
  });

  return { freight };
}
