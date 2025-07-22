import { PickupHistory, Prisma } from "@prisma/client";
import { PickupHistoriesRepository } from "@/modules/pickup/repositories/pickup-histories-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPickupsRepository implements PickupHistoriesRepository {
  public items: PickupHistory[] = [];

  async create(data: Prisma.PickupHistoryUncheckedCreateInput) {
    const pickupHistory = {
      id: data.id || randomUUID(),
      pickupId: data.pickupId,
      creatorId: data.creatorId || null,
      driverId: data.driverId || null,
      vehicleId: data.vehicleId || null,
      status: data.status || "PENDING",
      nonPickupReason: data.nonPickupReason || null,
      observation: data.observation || null,
      attemptDate: data.attemptDate ? new Date(data.attemptDate) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(pickupHistory);
  }
}
