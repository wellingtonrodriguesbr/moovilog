import { Address, Prisma } from "@prisma/client";

export interface CompanyAddressesRepository {
  create(
    data: Prisma.AddressUncheckedCreateInput,
    companyId: string
  ): Promise<Address>;
  findByCompanyId(companyId: string): Promise<Address | null>;
}
