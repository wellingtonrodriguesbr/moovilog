import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput, tx?: Prisma.TransactionClient) {
    const prismaTransaction = tx ?? prisma;
    const address = await prismaTransaction.address.create({
      data,
    });

    return address;
  }

  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      return null;
    }

    return address;
  }
}
