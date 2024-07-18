import { Company, Prisma } from "@prisma/client";

export interface CompaniesRepository {
  create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>;
  findByDocumentNumber(documentNumber: string): Promise<Company | null>;
  findByOwnerId(ownerId: string): Promise<Company | null>;
  findByCompanyMemberId(memberId: string): Promise<Company | null>;
}
