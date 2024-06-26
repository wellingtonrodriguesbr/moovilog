import { Address, Prisma } from "@prisma/client";

export interface CompanyAddressesRepository {
  createCompanyAddress(
    data: Prisma.AddressUncheckedCreateInput,
    companyId: string
  ): Promise<Address>;
}
