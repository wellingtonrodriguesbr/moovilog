import { Prisma } from "@prisma/client";
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
}
