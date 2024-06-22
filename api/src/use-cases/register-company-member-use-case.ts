import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterCompanyMemberUseCaseRequest {
  userId: string;
  creatorId: string;
  role: Role | undefined;
}

interface RegisterCompanyMemberUseCaseResponse {
  companyMemberId: string;
}

export async function registerCompanyMemberUseCase({
  userId,
  creatorId,
  role,
}: RegisterCompanyMemberUseCaseRequest): Promise<RegisterCompanyMemberUseCaseResponse> {
  const [user, company] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    await prisma.company.findFirst({
      where: {
        ownerId: creatorId,
      },
    }),
  ]);

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const userAlreadyRegisteredWithThisCompany =
    await prisma.companyMember.findUnique({
      where: {
        companyId_memberId: {
          companyId: company.id,
          memberId: user.id,
        },
      },
    });

  if (userAlreadyRegisteredWithThisCompany) {
    throw new CompanyMemberAlreadyExistsError();
  }

  const companyMember = await prisma.companyMember.create({
    data: {
      companyId: company.id,
      memberId: user.id,
      role,
    },
  });

  return { companyMemberId: companyMember.id };
}
