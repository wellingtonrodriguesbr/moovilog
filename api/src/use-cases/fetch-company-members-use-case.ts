import { prisma } from "@/lib/prisma";
import { CompanyMember } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

interface FetchCompanyMembersUseCaseRequest {
  userId: string;
}

interface FetchCompanyMembersUseCaseResponse {
  companyMembers: CompanyMember[];
}

export class FetchCompanyMembersUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private companyMembers: CompanyMembersRepository
  ) {}
}

export async function fetchCompanyMembersUseCase({
  userId,
}: FetchCompanyMembersUseCaseRequest): Promise<FetchCompanyMembersUseCaseResponse> {
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

  const companyMembers = await prisma.companyMember.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      member: {
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return { companyMembers };
}
