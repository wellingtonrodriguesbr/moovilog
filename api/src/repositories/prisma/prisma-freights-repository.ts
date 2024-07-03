import { prisma } from "@/lib/prisma";
import { FreightsRepository } from "../freights-repository";

export class PrismaFreightsRepository implements FreightsRepository {
  async findManyByDriverId(driverId: string) {
    const freights = await prisma.freight.findMany({
      where: {
        driverId,
      },
    });

    return freights;
  }
}
