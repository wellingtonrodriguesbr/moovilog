import { prisma } from "@/lib/prisma";
import { Prisma, VehicleStatus } from "@prisma/client";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";

export class PrismaVehiclesRepository implements VehiclesRepository {
  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    });

    return vehicle;
  }

  async findVehicleInCompanyByPlate(plate: string, companyId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate_companyId: {
          plate,
          companyId,
        },
      },
    });

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findVehicleInCompanyByTrailerPlate(trailerPlate: string, companyId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        trailerPlate_companyId: {
          trailerPlate,
          companyId,
        },
      },
    });

    if (!vehicle) {
      return null;
    }

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

  async findVehicleInCompany(id: string, companyId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
        companyId,
      },
    });

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findManyByCompanyId(companyId: string) {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return vehicles;
  }

  async updateStatus(id: string, status: VehicleStatus) {
    await prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async update(id: string, data: Prisma.VehicleUncheckedUpdateInput) {
    await prisma.vehicle.update({
      where: {
        id,
      },
      data,
    });
  }
}
