import { prisma } from "@/lib/prisma";
import { Company } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCompanyInformationUseCaseRequest {
  userId: string;
}

export interface State {
  id: string;
  name: string;
  acronym: string;
}

export interface City {
  id: string;
  name: string;
  state: State;
}

export interface Address {
  id: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  number: number;
  complement: string | null;
  city: City;
}

export interface CompanyAddress {
  address: Address;
}

interface GetCompanyInformationUseCaseResponse {
  company: Company;
  companyAddress: CompanyAddress;
}

export async function getCompanyInformationUseCase({
  userId,
}: GetCompanyInformationUseCaseRequest): Promise<GetCompanyInformationUseCaseResponse> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }

  const company = await prisma.companyMember.findFirst({
    where: {
      memberId: user.id,
    },
    include: {
      company: true,
    },
  });

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const companyAddress = await prisma.companyAddress.findUnique({
    where: {
      companyId: company.companyId,
    },
    select: {
      address: {
        select: {
          id: true,
          zipCode: true,
          street: true,
          neighborhood: true,
          number: true,
          complement: true,
          city: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
        },
      },
    },
  });

  if (!companyAddress) {
    throw new ResourceNotFoundError("company address not found");
  }

  return { ...company, companyAddress };
}
