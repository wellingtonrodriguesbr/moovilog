import { Freight, Prisma } from "@prisma/client";
import { FreightsRepository } from "../freights-repository";
import { randomUUID } from "crypto";

export class InMemoryFreightsRepository implements FreightsRepository {
  public items: Freight[] = [];

  async create(data: Prisma.FreightUncheckedCreateInput) {
    const freight = {
      id: randomUUID(),
      type: data.type,
      date: new Date(data.date),
      pickupsQuantity: data.pickupsQuantity,
      deliveriesQuantity: data.deliveriesQuantity,
      totalWeightOfPickups: data.totalWeightOfPickups || null,
      totalWeightOfDeliveries: data.totalWeightOfDeliveries,
      freightAmountInCents: data.freightAmountInCents,
      observation: data.observation || null,
      creatorId: data.creatorId,
      driverId: data.driverId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return freight;
  }

  async findManyByDriverId(driverId: string) {
    const freights = this.items.filter((item) => item.driverId === driverId);

    return freights;
  }
}
