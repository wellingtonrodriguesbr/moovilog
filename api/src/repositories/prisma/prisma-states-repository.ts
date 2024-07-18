import { State } from "@prisma/client";
import { StatesRepository } from "../states-repository";
import { prisma } from "@/lib/prisma";

export class PrismaStatesRepository implements StatesRepository {
  async findByCityId(cityId: string) {
    const state = await prisma.state.findFirst({
      where: {
        cities: {
          some: {
            id: cityId,
          },
        },
      },
    });

    if (!state) {
      return null;
    }

    return state;
  }
}
