import { CompanyMember, Prisma } from "@prisma/client";

export interface CompanyMembersRepository {
  create(
    data: Prisma.CompanyMemberUncheckedCreateInput
  ): Promise<CompanyMember>;
  findMemberByCompanyId(
    memberId: string,
    companyId: string
  ): Promise<CompanyMember | null>;
  findCompanyIdByMemberId(memberId: string): Promise<string | null>;
  findManyByCompanyId(companyId: string): Promise<CompanyMember[]>;
}
