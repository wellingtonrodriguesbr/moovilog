import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyMembersRepository } from "../company-members-repository";

export class PrismaCompanyMembersRepository
  implements CompanyMembersRepository
{
  async create(data: Prisma.CompanyMemberUncheckedCreateInput) {
    const companyMember = await prisma.companyMember.create({
      data: {
        companyId: data.companyId,
        memberId: data.memberId,
        role: data.role,
      },
    });

    return companyMember;
  }
  async findMemberByCompanyId(memberId: string, companyId: string) {
    const companyMember = await prisma.companyMember.findUnique({
      where: {
        companyId_memberId: {
          companyId,
          memberId,
        },
      },
    });

    return companyMember;
  }
}
