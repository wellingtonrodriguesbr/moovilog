import { prisma } from "../lib/prisma";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";

interface RegisterCompanyMemberUseCaseRequest {
  memberId: string;
  companyId: string;
}

interface RegisterCompanyMemberUseCaseResponse {
  companyMemberId: string;
}

export async function registerCompanyMemberUseCase({
  memberId,
  companyId,
}: RegisterCompanyMemberUseCaseRequest): Promise<RegisterCompanyMemberUseCaseResponse> {
  const user = await prisma.user.findUnique({
    where: {
      id: memberId,
    },
  });

  const userAlreadyRegisteredWithThisCompany =
    await prisma.companyMember.findUnique({
      where: {
        companyId_memberId: {
          companyId,
          memberId: user!.id,
        },
      },
    });

  if (userAlreadyRegisteredWithThisCompany) {
    throw new CompanyMemberAlreadyExistsError();
  }

  const companyMember = await prisma.companyMember.create({
    data: {
      companyId,
      memberId: user!.id,
    },
  });

  return { companyMemberId: companyMember.id };
}
