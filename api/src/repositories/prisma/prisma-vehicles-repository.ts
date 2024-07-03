import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { VehiclesRepository } from "../vehicles-repository";

export class PrismaVehiclesRepository implements VehiclesRepository {
  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    });

    return vehicle;
  }

  async findByPlate(plate: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    });

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    });

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }
}
