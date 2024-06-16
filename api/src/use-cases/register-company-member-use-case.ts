import { promise } from "zod";
import { prisma } from "../lib/prisma";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterCompanyMemberUseCaseRequest {
  userEmail: string;
}

interface RegisterCompanyMemberUseCaseResponse {
  companyMemberId: string;
}

export async function registerCompanyMemberUseCase({
  userEmail,
}: RegisterCompanyMemberUseCaseRequest): Promise<RegisterCompanyMemberUseCaseResponse> {
  const [user, company] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    }),
    await prisma.company.findFirst({
      where: {
        companyMembers: {
          some: {
            member: {
              email: userEmail,
            },
          },
        },
      },
    }),
  ]);

  if (!user || !company) {
    throw new ResourceNotFoundError("User not found");
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
      memberId: user!.id,
    },
  });

  return { companyMemberId: companyMember.id };
}
