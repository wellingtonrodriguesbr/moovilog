import { Address, Prisma } from "@prisma/client";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";
import { randomUUID } from "node:crypto";

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = [];

  async create(
    data: Prisma.AddressUncheckedCreateInput & {
      companyId?: string;
      driverId?: string;
    }
  ) {
    const address = {
      id: data.id ?? randomUUID(),
      zipCode: data.zipCode,
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number,
      complement: data.complement ?? null,
      createdAt: new Date(),
      cityId: data.cityId,
    };

    this.items.push(address);

    return address;
  }

  async findById(id: string) {
    const address = this.items.find((item) => item.id === id);

    if (!address) {
      return null;
    }

    return address;
  }
}
