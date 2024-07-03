import { $Enums, Prisma } from "@prisma/client";
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

    if (!companyMember) {
      return null;
    }

    return companyMember;
  }

  async findCompanyIdByMemberId(memberId: string) {
    const member = await prisma.companyMember.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      return null;
    }

    return member.companyId;
  }

  async findManyByCompanyId(companyId: string) {
    const companyMembers = await prisma.companyMember.findMany({
      where: {
        companyId,
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

    return companyMembers;
  }
}
