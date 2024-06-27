import { CompanyMember, Prisma } from "@prisma/client";
import { CompanyMembersRepository } from "../company-members-repository";
import { randomUUID } from "crypto";

export class InMemoryCompanyMembersRepository
  implements CompanyMembersRepository
{
  public items: CompanyMember[] = [];

  async create(data: Prisma.CompanyMemberUncheckedCreateInput) {
    const companyMember = {
      id: randomUUID(),
      companyId: data.companyId,
      memberId: data.memberId,
      role: data.role,
      sector: data.sector || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(companyMember);

    return companyMember;
  }

  async findMemberByCompanyId(memberId: string, companyId: string) {
    const member = this.items.find(
      (item) => item.memberId === memberId && item.companyId === companyId
    );

    if (!member) return null;

    return member;
  }

  async findCompanyIdByMemberId(memberId: string) {
    const member = this.items.find((item) => item.memberId === memberId);

    if (!member) return null;

    return member.companyId;
  }
}
