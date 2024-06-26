import { Address, Prisma } from "@prisma/client";
import { CompanyAddressesRepository } from "../company-addresses-repository";
import { randomUUID } from "crypto";

export class InMemoryCompanyAddressesRepository
  implements CompanyAddressesRepository
{
  public items: Address[] = [];

  async createCompanyAddress(
    data: Prisma.AddressUncheckedCreateInput,
    companyId: string
  ) {
    const companyAddress = {
      id: randomUUID(),
      zipCode: data.zipCode,
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number,
      complement: data.complement || null,
      cityId: data.cityId,
      companyAddress: {
        companyId,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(companyAddress);
    return companyAddress;
  }
}
