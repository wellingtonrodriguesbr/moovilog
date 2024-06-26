import { prisma } from "@/lib/prisma";
import { CitiesRepository } from "../cities-repository";

export class PrismaCitiesRepository implements CitiesRepository {
  async findByName(name: string) {
    const city = await prisma.city.findFirst({
      where: {
        name,
      },
    });

    if (!city) {
      return null;
    }

    return city;
  }
}
