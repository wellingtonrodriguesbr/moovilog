import { FreightByCompany, Prisma } from "@prisma/client";

export interface FreightsByCompanyRepository {
  create(
    data: Prisma.FreightByCompanyUncheckedCreateInput
  ): Promise<FreightByCompany>;
}
