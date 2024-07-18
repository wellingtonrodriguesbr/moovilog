import { Address, Prisma } from "@prisma/client";

export interface AddressesRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
  findById(id: string): Promise<Address | null>;
}
