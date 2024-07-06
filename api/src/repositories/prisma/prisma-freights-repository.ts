import { prisma } from "@/lib/prisma";
import { FreightsRepository } from "../freights-repository";
import { Prisma } from "@prisma/client";

export class PrismaFreightsRepository implements FreightsRepository {
  async create(data: Prisma.FreightUncheckedCreateInput) {
    const freight = await prisma.freight.create({
      data,
    });

    return freight;
  }

  async findManyByDriverId(driverId: string) {
    const freights = await prisma.freight.findMany({
      where: {
        driverId,
      },
    });

    return freights;
  }
}
