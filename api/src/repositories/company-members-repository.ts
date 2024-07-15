import { CompanyMember, Prisma } from "@prisma/client";

export interface CompanyMembersRepository {
  create(
    data: Prisma.CompanyMemberUncheckedCreateInput
  ): Promise<CompanyMember>;
  findById(memberId: string): Promise<CompanyMember | null>;
  findMemberInCompany(
    memberId: string,
    companyId: string
  ): Promise<CompanyMember | null>;
  findManyByCompanyId(companyId: string): Promise<CompanyMember[]>;
}
