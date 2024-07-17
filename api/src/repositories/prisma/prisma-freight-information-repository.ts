import { FreightInformation, Prisma } from "@prisma/client";
import { FreightInformationRepository } from "../freight-information-repository";
import { prisma } from "@/lib/prisma";

export class PrismaFreightInformationRepository
  implements FreightInformationRepository
{
  async create(data: Prisma.FreightInformationUncheckedCreateInput) {
    const freightInformation = await prisma.freightInformation.create({
      data,
    });

    return freightInformation;
  }

  async findByFreight(freightId: string) {
    const freightInformation = await prisma.freightInformation.findFirst({
      where: {
        freightId,
      },
    });

    if (!freightInformation) {
      return null;
    }

    return freightInformation;
  }
}
