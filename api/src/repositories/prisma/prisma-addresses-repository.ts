import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AddressesRepository } from "../addresses-repository";

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
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
