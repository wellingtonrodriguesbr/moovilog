import { Address, Prisma } from "@prisma/client";

export interface AddressesRepository {
  create(data: Prisma.AddressUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Address>;
  findById(id: string): Promise<Address | null>;
}
