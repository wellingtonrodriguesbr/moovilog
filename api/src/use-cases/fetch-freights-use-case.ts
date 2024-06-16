import { prisma } from "@/lib/prisma";
import { Freight } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchFreightsUseCaseRequest {
  userId: string;
}

interface FetchFreightsUseCaseResponse {
  freights: Freight[];
}

export async function fetchFreightsUseCase({
  userId,
}: FetchFreightsUseCaseRequest): Promise<FetchFreightsUseCaseResponse> {
  const company = await prisma.company.findFirst({
    where: {
      companyMembers: {
        some: {
          memberId: userId,
        },
      },
    },
  });

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const freights = await prisma.freight.findMany({
    where: {
      freightsByCompany: {
        some: {
          companyId: company.id,
        },
      },
    },
  });

  return { freights };
}
