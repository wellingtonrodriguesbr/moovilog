import { Prisma, Vehicle } from "@prisma/client";
import { VehiclesRepository } from "../vehicles-repository";
import { randomUUID } from "crypto";

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = [];

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = {
      id: randomUUID(),
      plate: data.plate,
      year: data.year,
      category: data.category,
      type: data.type,
      body: data.body,
      fullLoadCapacity: data.fullLoadCapacity,
      driverId: data.driverId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(vehicle);
    return vehicle;
  }

  async findByPlate(plate: string) {
    const vehicle = await this.items.find((item) => item.plate === plate);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findById(id: string) {
    const vehicle = await this.items.find((item) => item.id === id);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }
}
